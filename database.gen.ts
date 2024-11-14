'use server';

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * Asynchronously sets up the database by running Prisma migrations and generating Supabase types.
 *
 * This script performs the following tasks:
 * 1. Runs Prisma migrations and generates Prisma client.
 * 2. Generates Supabase types for the specified schemas.
 *
 * @throws Will throw an error if the NEXT_PUBLIC_SUPABASE_URL environment variable is not properly set.
 * @throws Will exit the process with code 1 if any command fails during execution.
 */
(async () => {
  const execPromise = promisify(exec);
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0];
  if (!projectRef) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not properly set');
  }
  try {
    console.log('Running Prisma migrations and generation...');
    const prismaCommand = 'bunx prisma migrate dev --name init && bunx prisma generate';
    const { stdout: prismaOutput, stderr: prismaError } = await execPromise(prismaCommand);

    if (prismaError) {
      console.warn('Prisma command produced warnings:', prismaError);
    }
    console.log('Prisma setup completed:', prismaOutput);

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
    process.exit(1);
  }
})();
