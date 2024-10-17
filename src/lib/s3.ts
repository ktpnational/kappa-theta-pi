import { S3Client } from '@aws-sdk/client-s3';

const {
  data: { session },
} = await supabase.auth.getSession();

const client = new S3Client({
  forcePathStyle: true,
  region: process.env.NEXT_PUBLIC_PROJECT_REGION,
  endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_URL.split('//')[1].split('.')[0],
    secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    sessionToken: session.access_token,
  },
});
