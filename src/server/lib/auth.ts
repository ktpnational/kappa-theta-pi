// 'use server';

import { getRole } from '@/lib';
import { db } from '@/lib/prisma';
import { logger } from '@/utils';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import authConfig from './auth.config';

const log = logger.getSubLogger({
  name: 'auth.config',
});

log.info('Initializing authentication system');

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  ...authConfig,
  appName: 'Kappa Theta PI',

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    onEmailVerification: async (user) => {
      log.info('Email verified', { userId: user.id });
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },

  user: {
    modelName: 'User',
    fields: {
      name: 'name',
      email: 'email',
      emailVerified: 'emailVerified',
      image: 'image',
    },
    additionalFields: {
      role: {
        type: ['GUEST', 'MEMBER', 'COMPANY'],
        enumValues: ['GUEST', 'MEMBER', 'COMPANY'],
        defaultValue: 'MEMBER',
      },
      isTwoFactorEnabled: {
        type: 'boolean',
        defaultValue: false,
      },
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        log.info('Preparing to delete user', { userId: user.id });
      },
      afterDelete: async (user) => {
        log.info('User deleted', { userId: user.id });
      },
    },
  },

  session: {
    modelName: 'Session',
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    storeSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
  },

  account: {
    modelName: 'Account',
    accountLinking: {
      enabled: true,
      allowDifferentEmails: false,
    },
  },

  verification: {
    modelName: 'VerificationToken',
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    ipAddress: {
      disableIpTracking: false,
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (userData, _context) => {
          log.info('Preparing to create user', { email: userData.email });
          return { data: userData };
        },
        after: async (user, _context) => {
          log.info('User created successfully', { userId: user.id });

          try {
            const role = await getRole();
            log.debug('Retrieved role for new user', { userId: user.id, role });
            await db.user.create({
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified || null,
                image: user.image,
                role: role || 'GUEST',
                profile: {
                  create: {
                    role: role || 'GUEST',
                    active: true,
                    // Initialize with empty values for other relations if needed
                  },
                },
              },
            });
            log.info('User profile created', { userId: user.id, role: role || 'GUEST' });
          } catch (error) {
            log.error('Failed to create user profile', { userId: user.id, error });
            throw error;
          }
        },
      },
      update: {
        before: async (userData, _context) => {
          log.info('Preparing to update user', { userId: userData.id });
          return {
            data: userData, // Can modify data before update if needed
          };
        },
        after: async (user, _context) => {
          log.info('User updated', { userId: user.id });

          try {
            const role = await getRole();
            log.debug('Retrieved role for user update', { userId: user.id, role });
            // Update user in auth schema
            await db.user.update({
              where: { id: user.id },
              data: {
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified || null,
                image: user.image,
                role: role || undefined,
              },
            });
            log.debug('User record updated in database', { userId: user.id });

            // Also update profile if role changed
            if (role) {
              await db.profile.update({
                where: { userId: user.id },
                data: {
                  role: role,
                },
              });
              log.debug('User profile role updated', { userId: user.id, role });
            }
          } catch (error) {
            log.error('Failed to update user data', { userId: user.id, error });
          }
        },
      },
    },
    session: {
      create: {
        before: async (sessionData) => {
          log.debug('Preparing to create session', { userId: sessionData.userId });
          return { data: sessionData };
        },
        after: async (session) => {
          log.info('Session created', { sessionId: session.id, userId: session.userId });
        },
      },
      update: {
        before: async (sessionData, _context) => {
          log.debug('Preparing to update session', { sessionId: sessionData.id });
          return {
            data: sessionData as typeof sessionData & {
              id: string;
              createdAt: Date;
              updatedAt: Date;
              userId: string;
              expiresAt: Date;
              token: string;
            },
          };
        },
        after: async (session) => {
          log.info('Session updated', { sessionId: session.id, userId: session.userId });
        },
      },
      delete: {
        before: async (sessionId: string) => {
          log.debug('Preparing to delete session', { sessionId });
        },
        after: async (sessionId: string) => {
          log.info('Session deleted', { sessionId });
        },
      },
    },
    account: {
      create: {
        before: async (accountData) => {
          log.debug('Preparing to create account', {
            provider: accountData.providerId,
            userId: accountData.userId,
          });
          return { data: accountData };
        },
        after: async (account) => {
          log.info('Account linked', { provider: account.providerId, userId: account.userId });
        },
      },
      delete: {
        before: async (accountId: string) => {
          log.debug('Preparing to delete account', { accountId });
        },
        after: async (accountId: string) => {
          log.info('Account unlinked', { accountId });
        },
      },
    },
  },

  onAPIError: {
    throw: true,
    onError: async (error, ctx) => {
      // TODO: Change this to the actual path
      log.error('Auth API error', { error, path: ctx.baseURL });
    },
  },
});

log.info('Authentication system initialized successfully');

export const { api } = auth;
