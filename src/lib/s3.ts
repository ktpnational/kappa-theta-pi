import { createClient } from '@/utils';
import { S3Client } from '@aws-sdk/client-s3';

const supabase = createClient();

const accessKeyId = process.env.NEXT_PUBLIC_SUPABASE_URL.split('//')[1]?.split('.')[0];
if (!accessKeyId) {
  throw new Error('Access Key ID is undefined');
}

/**
 * Retrieves an S3 client instance configured with the necessary credentials and endpoint.
 *
 * @returns {Promise<S3Client>} - A promise that resolves to an S3 client instance.
 * @throws {Error} - Throws an error if there is no active session or if the access key ID is undefined.
 */
async function getS3Client(): Promise<S3Client> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }
  return new S3Client({
    forcePathStyle: true,
    region: process.env.NEXT_PUBLIC_PROJECT_REGION,
    endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`,
    credentials: {
      accessKeyId: accessKeyId || '',
      secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      sessionToken: session?.access_token,
    },
  });
}

export { getS3Client };
