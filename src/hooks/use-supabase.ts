'use client';

import { createAuthenticatedClient, createClient } from '@/utils/supabase/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

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
