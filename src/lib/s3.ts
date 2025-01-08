import { createClient } from '@/utils';
import { S3Client } from '@aws-sdk/client-s3';
import { env } from '@/env';

/** Singleton instance of the Supabase client */
let supabase: ReturnType<typeof createClient>;

/**
 * Lazily initializes and returns the Supabase client instance.
 * Creates a new client if one doesn't exist, otherwise returns the existing instance.
 *
 * @returns {ReturnType<typeof createClient>} The Supabase client instance
 */
const getSupabase = () => {
  if (!supabase) {
    supabase = createClient();
  }
  return supabase;
};

/**
 * Creates and configures an S3 client for interacting with Supabase Storage.
 *
 * This function:
 * 1. Verifies an active user session exists
 * 2. Extracts the access key ID from the Supabase URL
 * 3. Configures and returns an S3 client with proper credentials
 *
 * @throws {Error} If there is no active session
 * @throws {Error} If the access key ID cannot be extracted from the Supabase URL
 *
 * @returns {Promise<S3Client>} A configured S3 client instance
 *
 * Required environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL: The Supabase project URL
 * - NEXT_PUBLIC_PROJECT_REGION: The AWS region for S3 operations
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: The anonymous API key for Supabase
 */
async function getS3Client(): Promise<S3Client> {
  const {
    data: { session },
  } = await getSupabase().auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }

  const accessKeyId = env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0];
  if (!accessKeyId) {
    throw new Error('Access Key ID is undefined');
  }

  return new S3Client({
    forcePathStyle: true,
    region: env.NEXT_PUBLIC_PROJECT_REGION,
    endpoint: `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`,
    credentials: {
      accessKeyId,
      secretAccessKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      sessionToken: session?.access_token,
    },
  });
}

export { getS3Client };
