import 'server-only';
import authConfig from '@/auth.config';
import { db, getRole } from '@/lib';
import { logger } from '@/utils';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const log = logger.getSubLogger({
  name: 'auth.config',
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  ...authConfig,
  appName: 'Kappa Theta PI',

  // Configure email verification
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    onEmailVerification: async (user) => {
      log.info('Email verified', { userId: user.id });
    },
  },

  // Email and password configuration
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },

  // User model configuration
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
    // Enable account deletion
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

  // Session configuration
  session: {
    modelName: 'Session',
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    storeSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
  },

  // Account configuration for social providers
  account: {
    modelName: 'Account',
    accountLinking: {
      enabled: true,
      allowDifferentEmails: false,
    },
  },

  // Verification token settings
  verification: {
    modelName: 'VerificationToken',
  },

  // Advanced settings
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    ipAddress: {
      disableIpTracking: false,
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user, _context) => {
          log.info('User created successfully', { userId: user.id });

          try {
            // Create user in auth schema with profile in public schema
            await db.user.create({
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified || null,
                image: user.image,
                role: (await getRole({ userId: user.id })) || 'MEMBER',
                profile: {
                  create: {
                    role: (await getRole({ userId: user.id })) || 'MEMBER',
                    active: true,
                    // Initialize with empty values for other relations if needed
                  },
                },
              },
            });
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
            // Update user in auth schema
            await db.user.update({
              where: { id: user.id },
              data: {
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified || null,
                image: user.image,
                role: (await getRole({ userId: user.id })) || undefined,
              },
            });

            // Also update profile if role changed
            if (await getRole({ userId: user.id })) {
              await db.profile.update({
                where: { userId: user.id },
                data: {
                  role: await getRole({ userId: user.id }),
                },
              });
            }
          } catch (error) {
            log.error('Failed to update user data', { userId: user.id, error });
          }
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          log.info('Session created', { sessionId: session.id, userId: session.userId });
        },
      },
      update: {
        after: async (session) => {
          log.info('Session updated', { sessionId: session.id, userId: session.userId });
        },
      },
    },
    account: {
      create: {
        after: async (account) => {
          log.info('Account linked', { provider: account.providerId, userId: account.userId });
        },
      },
    },
  },

  // Error handling
  onAPIError: {
    throw: true,
    onError: async (error, ctx) => {
      // TODO: Change this to the actual path
      log.error('Auth API error', { error, path: ctx.baseURL });
    },
  },
});

export const { api } = auth;
