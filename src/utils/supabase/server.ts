'use server';

import { env } from '@/env';
import type { Database } from '@/types/supabase';
import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates and configures a Supabase server client with cookie-based authentication.
 *
 * @description
 * This function initializes a server-side Supabase client with the following capabilities:
 * - Type-safe database operations using the Database type
 * - Cookie-based authentication state management
 * - Automatic handling of session refresh and persistence
 *
 * The client is configured with cookie handlers that:
 * - Retrieve existing cookies for authentication state
 * - Set new cookies for updated sessions
 * - Remove cookies when logging out or expiring sessions
 *
 * @async
 * @function
 * @throws {Error} If client creation fails, with the specific error message or 'Unknown error [createServer]'
 *
 * @example
 * ```typescript
 * const supabase = await createServer();
 * const { data, error } = await supabase.from('table').select('*');
 * ```
 *
 * @returns {Promise<ReturnType<typeof createServerClient<Database>>>} A configured Supabase client instance
 * that is typed with your database schema and ready for server-side operations
 *
 * @security
 * - Uses environment variables for Supabase credentials
 * - Implements secure cookie handling for session management
 * - Should only be used in server-side contexts
 */
export const createServer = async () => {
  try {
    const cookieStore = await cookies();

    const client = createServerClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      },
    );
    return client;
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error [createServer]'}`);
  }
};
