import 'server-only';
import authConfig from '@/auth.config';
import { db } from '@/lib';
import { logger } from '@/utils';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const log = logger.getSubLogger({
  name: 'auth.config',
});

export const auth = betterAuth({
  database:  prismaAdapter(db, {
    provider: 'postgresql',
  }),
  ...authConfig,
  appName: 'Kappa Theta PI',

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          log.info('User created successfully', { userId: user.id });
        },
      },
    },
  },
});

export const { api } = auth;
