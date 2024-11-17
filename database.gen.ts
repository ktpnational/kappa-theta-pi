'use server';

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * Asynchronously sets up the database by running Prisma migrations and generating Supabase types.
 * This script uses non-interactive commands that work in all environments.
 *
 * @description
 * This script performs the following tasks in sequence:
 * 1. Validates the Supabase URL environment variable
 * 2. Generates the Prisma client
 * 3. Pushes schema changes to database (dev only)
 * 4. Applies existing migrations
 * 5. Generates Supabase TypeScript types
 *
 * @environment
 * Required environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL: The full URL of your Supabase project
 * - NODE_ENV: Environment type (development/production)
 */
(async () => {
  const execPromise = promisify(exec);

  // Validate Supabase URL
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0];
  if (!projectRef) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not properly set');
  }

  const isDev = process.env.NODE_ENV !== 'production';

  try {
    console.log('Starting database setup...');

    console.log('Generating Prisma client...');
    const { stdout: generateOutput, stderr: generateError } = await execPromise('bunx prisma generate');

    if (generateError) {
      console.warn('Prisma generate produced warnings:', generateError);
    }
    console.log('Prisma client generated:', generateOutput);

    if (isDev) {
      console.log('Pushing schema changes (development only)...');
      try {
        const { stdout: pushOutput, stderr: pushError } = await execPromise('bunx prisma db push --accept-data-loss --skip-generate');
        if (pushError) {
          console.warn('Schema push produced warnings:', pushError);
        }
        console.log('Schema push completed:', pushOutput);
      } catch (pushError) {
        console.warn('Schema push failed, continuing with migrations:', pushError);
      }
    }

    console.log('Applying migrations...');
    const { stdout: migrateOutput, stderr: migrateError } = await execPromise('bunx prisma migrate deploy');

    if (migrateError) {
      console.warn('Migration produced warnings:', migrateError);
    }
    console.log('Migrations completed:', migrateOutput);

    console.log('Generating Supabase types...');
    const supabaseCommand = `npx supabase gen types --lang=typescript --project-id "${projectRef}" --schema public,auth,storage,next_auth > src/types/supabase.ts`;
    const { stdout: supabaseOutput, stderr: supabaseError } = await execPromise(supabaseCommand);

    if (supabaseError) {
      console.warn('Supabase types generation produced warnings:', supabaseError);
    }
    console.log('Supabase types generated successfully:', supabaseOutput);

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Failed to complete database setup:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        // @ts-ignore
        code: error.code,
      });
    }
    process.exit(1);
  }
})();
