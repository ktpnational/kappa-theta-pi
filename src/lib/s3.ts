import { createClient } from '@/utils';
import { S3Client } from '@aws-sdk/client-s3';

/**
 * Creates a Supabase client instance for database interactions
 * @constant {ReturnType<typeof createClient>}
 */
const supabase = createClient();

/**
 * Extracts the access key ID from the Supabase URL environment variable
 * The ID is parsed by splitting on '//' and '.' to get the project ID
 * @constant {string}
 * @throws {Error} If the access key ID cannot be extracted from the URL
 */
const accessKeyId = process.env.NEXT_PUBLIC_SUPABASE_URL.split('//')[1]?.split('.')[0];
if (!accessKeyId) {
  throw new Error('Access Key ID is undefined');
}

/**
 * Retrieves an AWS S3 client instance configured with Supabase storage credentials and settings.
 *
 * Creates a new S3Client with authentication and configuration for Supabase storage.
 * Uses environment variables and session tokens to setup secure access.
 *
 * @async
 * @function getS3Client
 * @returns {Promise<S3Client>} A promise that resolves to a configured S3 client instance
 * @throws {Error} When there is no active user session
 * @throws {Error} When required environment variables are missing
 *
 * @example
 * try {
 *   const s3Client = await getS3Client();
 *   // Use s3Client for storage operations
 * } catch (error) {
 *   console.error('Failed to get S3 client:', error);
 * }
 *
 * @requires NEXT_PUBLIC_SUPABASE_URL - The Supabase project URL
 * @requires NEXT_PUBLIC_PROJECT_REGION - The AWS/Supabase region
 * @requires NEXT_PUBLIC_SUPABASE_ANON_KEY - The anonymous API key
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
