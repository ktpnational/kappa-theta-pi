import { createClient } from '@/utils';
import { S3Client } from '@aws-sdk/client-s3';

const supabase = createClient();

const accessKeyId = process.env.NEXT_PUBLIC_SUPABASE_URL.split('//')[1]?.split('.')[0];
if (!accessKeyId) {
  throw new Error('Access Key ID is undefined');
}

async function getS3Client() {
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
