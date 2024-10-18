import { createClient } from '@/utils';
import { parseCodePath } from '@/utils';
import { S3Client } from '@aws-sdk/client-s3';
import type { Session } from '@supabase/supabase-js';

const getSupabaseClient = async (): Promise<Session | null> => {
  try {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error(parseCodePath('Session is null', getSupabaseClient));
    }

    return session;
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : parseCodePath('Failed to get Supabase client', getSupabaseClient)}`,
    );
  }
};

const supabaseClient = await getSupabaseClient();

const accessKeyId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0];
if (!accessKeyId) {
  throw new Error('Access Key ID is undefined');
}

export const s3Client = new S3Client({
  forcePathStyle: true,
  region: process.env.NEXT_PUBLIC_PROJECT_REGION,
  endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    sessionToken: supabaseClient?.access_token,
  },
});
