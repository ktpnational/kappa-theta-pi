'use server';

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * Database Setup and Type Generation Script
 *
 * @description
 * An immediately invoked async function that handles complete database setup, schema management,
 * and type generation for both Prisma and Supabase. This script is designed to run as part of
 * the deployment process or local development setup.
 *
 * @process Flow
 * 1. Environment Validation
 *    - Validates NEXT_PUBLIC_SUPABASE_URL format and presence
 *    - Checks for SUPABASE_ACCESS_TOKEN
 *    - Determines environment (development/production)
 *
 * 2. Supabase Authentication
 *    - Logs in to Supabase CLI using provided access token
 *    - Enables subsequent Supabase operations
 *
 * 3. Prisma Setup
 *    - Generates Prisma client for type-safe database operations
 *    - In development: Pushes schema changes directly (with data loss acceptance)
 *    - Applies pending migrations using prisma migrate
 *
 * 4. Type Generation
 *    - Generates TypeScript types from Supabase schemas
 *    - Includes public, auth, storage, and next_auth schemas
 *
 * @environment
 * Required Environment Variables:
 * - NEXT_PUBLIC_SUPABASE_URL: Complete Supabase project URL
 *   Format: https://<project-ref>.supabase.co
 * - SUPABASE_ACCESS_TOKEN: Authentication token for Supabase operations
 *   Obtain from: Supabase Dashboard > Account > Access Tokens
 * - NODE_ENV: Deployment environment identifier
 *   Values: "development" | "production"
 *
 * @error Handling
 * - Provides detailed error logging with full stack traces
 * - Continues execution on non-critical warnings
 * - Exits with status code 1 on critical failures
 *
 * @output
 * Generated Files:
 * - Prisma Client: node_modules/.prisma/client/
 * - Supabase Types: src/types/supabase.ts
 *
 * @dependencies
 * Required CLI Tools:
 * - Supabase CLI
 * - Prisma CLI
 * - Bun (for bunx execution)
 *
 * @security
 * Note: This script handles sensitive credentials and should only be run in
 * secure environments with proper access controls.
 */
(async () => {
  const execPromise = promisify(exec);

  // Validate environment variables
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0];
  if (!projectRef) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not properly set');
  }

  if (!process.env.SUPABASE_ACCESS_TOKEN) {
    throw new Error('SUPABASE_ACCESS_TOKEN environment variable is not set');
  }

  const isDev = process.env.NODE_ENV !== 'production';

  try {
    console.log('Starting database setup...');

    // Login to Supabase CLI first
    console.log('Logging in to Supabase CLI...');
    const { stdout: loginOutput, stderr: loginError } = await execPromise(
      `bunx supabase login --token ${process.env.SUPABASE_ACCESS_TOKEN}`,
    );

    if (loginError) {
      console.warn('Supabase login produced warnings:', loginError);
    }
    console.log('Supabase CLI login completed:', loginOutput);

    console.log('Generating Prisma client...');
    const { stdout: generateOutput, stderr: generateError } =
      await execPromise('bunx prisma generate');

    if (generateError) {
      console.warn('Prisma generate produced warnings:', generateError);
    }
    console.log('Prisma client generated:', generateOutput);

    if (isDev) {
      console.log('Pushing schema changes (development only)...');
      try {
        const { stdout: pushOutput, stderr: pushError } = await execPromise(
          'bunx prisma db push --accept-data-loss --skip-generate',
        );
        if (pushError) {
          console.warn('Schema push produced warnings:', pushError);
        }
        console.log('Schema push completed:', pushOutput);
      } catch (pushError) {
        console.warn('Schema push failed, continuing with migrations:', pushError);
      }
    }

    console.log('Applying migrations...');
    const { stdout: migrateOutput, stderr: migrateError } = await execPromise(
      'bunx prisma migrate deploy',
    );

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
