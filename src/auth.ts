import { LoginSchema } from '@/schemas';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/prisma";
import { logger } from '@/utils';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import authConfig from '@/auth.config';

const log = logger.getSubLogger({
  name: 'auth.config',
});

export const auth = betterAuth({
  ...authConfig,
  // Database adapter
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // App name (used for 2FA and other features)
  appName: "Kappa Theta PI",

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    async sendVerificationEmail({ email, url }: { email: string; url: string }) {
      // Implement your email sending logic here
      console.log(`Sending verification email to ${email} with URL: ${url}`);
    },
    async sendResetPassword(url, user) {
      // Implement your password reset email logic here
      console.log(`Sending reset password email to ${user.email} with URL: ${url}`);
    },
  },

  // Database hooks (similar to your current events)
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Any logic you want to run after user creation
        },
      },
    },
  },
});

// Export client for use in components
export const { api } = auth;
