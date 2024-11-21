import type { Database } from '@/types/supabase';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: ReturnType<typeof createSupabaseClient<Database>> | null = null;

/**
 * Creates a basic Supabase client for anonymous operations using a singleton pattern.
 * 
 * @description
 * This function initializes and returns a Supabase client instance with the following features:
 * - Type-safe database operations using the Database type
 * - Singleton pattern to ensure only one client instance exists
 * - Automatic token refresh and session persistence
 * - Cross-platform storage handling (browser vs server)
 * 
 * The client is configured with:
 * - Environment-based Supabase credentials
 * - Local storage for session management in browser environments
 * - Fallback storage implementation for server environments
 * - Automatic session refresh and URL detection
 * 
 * @example
 * ```typescript
 * const supabase = createClient();
 * const { data, error } = await supabase.from('table').select('*');
 * ```
 * 
 * @returns {ReturnType<typeof createSupabaseClient<Database>>} A singleton Supabase client instance
 * that is typed with your database schema
 * 
 * @throws {Error} If NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are not set
 */
export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage:
          typeof window !== 'undefined'
            ? window.localStorage
            : {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
              },
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    },
  );

  return supabaseInstance;
};

/**
 * Creates an authenticated Supabase client with a provided access token.
 * 
 * @description
 * This function creates a new Supabase client instance with authentication configured:
 * - Includes Authorization header with provided access token
 * - Type-safe database operations using the Database type
 * - Automatic token refresh and session persistence
 * - Cross-platform storage handling (browser vs server)
 * 
 * The client is configured with:
 * - Environment-based Supabase credentials
 * - Bearer token authentication
 * - Local storage for session management in browser environments
 * - Fallback storage implementation for server environments
 * - Automatic session refresh and URL detection
 * 
 * @param {string} accessToken - The JWT access token to authenticate requests
 * 
 * @example
 * ```typescript
 * const accessToken = 'your-jwt-token';
 * const supabase = createAuthenticatedClient(accessToken);
 * const { data, error } = await supabase.from('protected_table').select('*');
 * ```
 * 
 * @returns {ReturnType<typeof createSupabaseClient<Database>>} A new authenticated Supabase client instance
 * that is typed with your database schema
 * 
 * @throws {Error} If NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are not set
 * @throws {Error} If the provided access token is invalid or expired
 */
export const createAuthenticatedClient = (accessToken: string) => {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        storage:
          typeof window !== 'undefined'
            ? window.localStorage
            : {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
              },
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    },
  );
};
