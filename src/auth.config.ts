import { env } from '@/env';
import type { BetterAuthOptions } from 'better-auth';
import {
  twoFactor,
  captcha,
  magicLink,
  jwt
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { getURL } from "./utils";

export default {
  socialProviders: {
    google: {
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: env.TURNSTILE_SECRET_KEY,
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
        keyPairConfig: {
          alg: "EdDSA",
          crv: "Ed25519"
        }
      },
      jwt: {
        issuer: getURL(),
        audience: getURL(),
        expirationTime: "30d", // Match your current session maxAge
        definePayload: ({ session, user }) => ({
          aud: session.id ? 'authenticated' : 'public',
          sub: session.id,
          email: user.email,
          role: user.role,
        }),
      }
    }),

    nextCookies()
  ],
} satisfies BetterAuthOptions;
