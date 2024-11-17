'use client';

import { createAuthenticatedClient, createClient } from '@/utils/supabase/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

/**
 * Custom React hook that provides access to a Supabase client instance.
 * The client can be either authenticated or unauthenticated based on the current session state.
 *
 * @remarks
 * This hook integrates with NextAuth.js session management and automatically switches between
 * authenticated and unauthenticated Supabase clients based on the presence of a valid access token.
 *
 * @returns A Supabase client instance that can be used to interact with the Supabase backend
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const supabase = useSupabase();
 *
 *   async function fetchData() {
 *     const { data, error } = await supabase
 *       .from('my_table')
 *       .select('*');
 *   }
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export const useSupabase = () => {
  const { data: session } = useSession();
  const [supabase, setSupabase] = useState(createClient());

  useEffect(() => {
    if (session?.supabaseAccessToken) {
      const client = createAuthenticatedClient(session.supabaseAccessToken);
      setSupabase(client);
    } else {
      setSupabase(createClient());
    }
  }, [session?.supabaseAccessToken]);

  return supabase;
};
