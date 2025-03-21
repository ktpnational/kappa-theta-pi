'use server';

import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { logger } from '@/utils';
import { Redacted } from '@/classes';

const execPromise = promisify(exec);

const retry = async (fn: () => Promise<any>, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      logger.warn(`Retrying... (${retries} attempts left)`, { error });
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

const updateShouldUseSupabase = (shouldUseSupabase: boolean) => {
  const filePath = path.join(process.cwd(), 'src/config/supabase.ts');
  const fileContent = fs.readFileSync(filePath, 'utf8').split('\n');

  const updatedContent = fileContent.map((line) => {
    if (line.includes('export const SHOULD_USE_SUPABASE =')) {
      return `export const SHOULD_USE_SUPABASE = ${shouldUseSupabase};`;
    }
    return line;
  });

  fs.writeFileSync(filePath, updatedContent.join('\n'));
  logger.info(`Updated SHOULD_USE_SUPABASE to ${shouldUseSupabase} in src/config/supabase.ts`);
};

(async () => {
  const projectRef = Redacted.make(process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]);

  if (!process.env.SUPABASE_ACCESS_TOKEN) {
    logger.error('SUPABASE_ACCESS_TOKEN environment variable is not set');
    process.exit(1);
  }

  const isDev = process.env.NODE_ENV !== 'production';

  try {
    logger.info('Starting database setup...', { env: process.env.NODE_ENV, projectRef });

    logger.info('Logging in to Supabase CLI...');
    const { stdout: loginOutput, stderr: loginError } = await retry(() =>
      execPromise(`bunx supabase login --token ${Redacted.make(process.env.SUPABASE_ACCESS_TOKEN).getValue()}`),
    );

    if (loginError) {
      logger.warn('Supabase login produced warnings:', { error: loginError });
    }
    logger.info('Supabase CLI login completed:', { output: loginOutput });

    logger.info('Generating Prisma client...');
    const { stdout: generateOutput, stderr: generateError } = await retry(() =>
      execPromise('bunx prisma generate'),
    );

    if (generateError) {
      logger.warn('Prisma generate produced warnings:', { error: generateError });
    }
    logger.info('Prisma client generated:', { output: generateOutput });

    if (isDev) {
      logger.info('Pushing schema changes (development only)...');
      try {
        const { stdout: pushOutput, stderr: pushError } = await retry(() =>
          execPromise('bunx prisma db push --accept-data-loss --skip-generate'),
        );
        if (pushError) {
          logger.warn('Schema push produced warnings:', { error: pushError });
        }
        logger.info('Schema push completed:', { output: pushOutput });
      } catch (pushError) {
        logger.warn('Schema push failed, continuing with migrations:', { error: pushError });
      }
    }

    logger.info('Applying migrations...');
    const { stdout: migrateOutput, stderr: migrateError } = await retry(() =>
      execPromise('bunx prisma migrate deploy'),
    );

    if (migrateError) {
      logger.warn('Migration produced warnings:', { error: migrateError });
    }
    logger.info('Migrations completed:', { output: migrateOutput });

    logger.info('Generating Supabase types...');
    const supabaseCommand = `npx supabase gen types --lang=typescript --project-id "${projectRef.getValue()}" --schema public,auth,storage,next_auth > src/types/supabase.ts`;
    const { stdout: supabaseOutput, stderr: supabaseError } = await retry(() =>
      execPromise(supabaseCommand),
    );

    if (supabaseError) {
      logger.warn('Supabase types generation produced warnings:', { error: supabaseError });
    }
    logger.info('Supabase types generated successfully:', { output: supabaseOutput });

    logger.info('Database setup completed successfully!');

    updateShouldUseSupabase(true);
    logger.info('Updated SHOULD_USE_SUPABASE to true in src/config/supabase.ts');
  } catch (error) {
    logger.error('Failed to complete database setup:', { error });

    updateShouldUseSupabase(false);
    logger.info('Updated SHOULD_USE_SUPABASE to false in src/config/supabase.ts');

    if (error instanceof Error) {
      logger.error('Error details:', {
        message: error.message,
        stack: error.stack,
        // @ts-ignore
        code: error.code,
      });
    }
    process.exit(1);
  }
})();
