import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/prisma";
import {
  twoFactor,
  captcha,
  magicLink,
  jwt
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
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

  // Social providers
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    },
  },

  // Plugins
  plugins: [
    // Captcha
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    }),

    // Two-factor authentication
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }, request) {
          // Implement your OTP sending logic here
          console.log(`Sending OTP ${otp} to user ${user.email}`);
        },
      },
    }),

    // Magic link authentication
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // Implement your magic link email sending logic here
        console.log(`Sending magic link to ${email} with URL: ${url}`);
      }
    }),

    // JWT plugin for Supabase integration
    jwt({
      jwks: {

      }
      jwt: {
        issuer: process.env.NEXT_PUBLIC_SUPABASE_URL,
        audience: process.env.NEXT_PUBLIC_SUPABASE_URL,
        expirationTime: "30d", // Match your current session maxAge
        definePayload: (user) => ({
          aud: 'authenticated',
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        }),
      }
    }),

    nextCookies()
  ],

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
