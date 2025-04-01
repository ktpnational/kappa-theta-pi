"use client";

import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { toast } from 'sonner';
import { logger } from '@/utils';

const log = logger.getSubLogger({ prefix: ['AuthClient'] });

export const authClient = createAuthClient({
  plugins: [organizationClient()],
  fetchOptions: {
    onError: (ctx) => {
      log.error('Authentication error', {
        error: ctx.error.message,
        code: ctx.error.code
      });
      toast.error(ctx.error.message);
    },
    onSuccess: () => {
      log.info('Authentication request successful');
    },
    onRequest: (url) => {
      log.debug('Authentication request initiated', { url });
    },
  },
});

log.info('Auth client initialized');

export const { useSession, signOut, signIn, signUp } = authClient;
