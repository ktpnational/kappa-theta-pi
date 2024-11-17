import { randomUUID as uuidv4 } from 'crypto';
import { getS3Client } from '@/lib/s3';
import { createClient } from '@/utils/supabase/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import imageCompression from 'browser-image-compression';

/**
 * Properties for the uploadImage function.
 * @interface UploadProps
 * @property {File} file - The image file to be uploaded
 * @property {string} bucket - The S3 bucket name where the image will be stored
 * @property {string} [folder] - Optional subfolder path within the bucket
 * @property {string} resumeId - The ID of the associated resume
 * @property {string} chapterId - The ID of the associated chapter
 * @property {string} profileId - The ID of the associated profile
 * @property {boolean} [useMultipart=false] - Whether to use multipart upload for large files
 */
type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
  resumeId: string;
  chapterId: string;
  profileId: string;
  useMultipart?: boolean;
};

/**
 * Uploads an image to S3 and creates associated database records.
 *
 * @async
 * @param {UploadProps} props - The upload properties
 * @param {File} props.file - The image file to upload
 * @param {string} props.bucket - Target S3 bucket name
 * @param {string} [props.folder] - Optional subfolder path in bucket
 * @param {string} props.resumeId - Associated resume ID
 * @param {string} props.chapterId - Associated chapter ID
 * @param {string} props.profileId - Associated profile ID
 * @param {boolean} [props.useMultipart=false] - Whether to use multipart upload
 *
 * @returns {Promise<{
 *   imageUrl: string,
 *   imageData?: any,
 *   error: string
 * }>} Object containing:
 * - imageUrl: Public URL of uploaded image (empty string if failed)
 * - imageData: Database record data if successful
 * - error: Error message if failed, empty string if successful
 *
 * @throws Will not throw directly, but returns error information in result object
 *
 * @description
 * This function performs several operations:
 * 1. Compresses the image to max 1MB
 * 2. Uploads to S3 using either multipart or standard upload
 * 3. Gets the public URL for the uploaded file
 * 4. Creates a database record linking the image to resume/chapter/profile
 */
export const uploadImage = async ({
  file,
  bucket,
  folder,
  resumeId,
  chapterId,
  profileId,
  useMultipart = false,
}: UploadProps) => {
  const supabase = createClient();
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? `${folder}/` : ''}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });

    const s3Client = await getS3Client();

    if (useMultipart) {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucket,
          Key: path,
          Body: file,
          ContentType: file.type,
        },
      });

      await upload.done();
    } else {
      const uploadCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: path,
        Body: file,
        ContentType: file.type,
      });

      await s3Client.send(uploadCommand);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);

    const { data: imageData, error: insertError } = await supabase
      .from('members')
      .insert({
        id: uuidv4(),
        resumeId,
        chapterId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profileId,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting image data:', insertError);
      return { imageUrl: '', error: 'Failed to save image information' };
    }

    return { imageUrl: publicUrlData.publicUrl, imageData, error: '' };
  } catch (error) {
    console.error('Unexpected error during upload:', error);
    return {
      imageUrl: '',
      error: `Unexpected error during upload: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};

/**
 * Deletes an image from Supabase storage.
 *
 * @async
 * @param {string} imageUrl - The public URL of the image to delete
 *
 * @returns {Promise<{
 *   data: any | null,
 *   error: string | null
 * }>} Object containing:
 * - data: Response data from successful deletion
 * - error: Error message if deletion failed
 *
 * @description
 * This function:
 * 1. Parses the bucket name and file path from the public URL
 * 2. Attempts to remove the file from Supabase storage
 * 3. Returns the result or error information
 *
 * @example
 * ```ts
 * const { data, error } = await deleteImage('https://example.com/storage/v1/object/public/bucket-name/path/to/image.jpg');
 * if (error) {
 *   console.error('Failed to delete:', error);
 * }
 * ```
 */
export const deleteImage = async (imageUrl: string) => {
  const supabase = createClient();
  const bucketAndPathString = imageUrl.split('/storage/v1/object/public/')[1];
  if (!bucketAndPathString) {
    return { data: null, error: 'Invalid image URL' };
  }
  const firstSlashIndex = bucketAndPathString.indexOf('/');

  const bucket = bucketAndPathString.slice(0, firstSlashIndex);
  const path = bucketAndPathString.slice(firstSlashIndex + 1);

  const { data, error } = await supabase.storage.from(bucket).remove([path]);

  return { data, error };
};
