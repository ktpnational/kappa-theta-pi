import { env } from '@/env';
import type { BetterAuthOptions } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import {
  captcha,
  jwt,
  // magicLink,
  // twoFactor
} from 'better-auth/plugins';
import { getURL } from '@/utils';

export default {
  socialProviders: {
    google: {
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: env.TURNSTILE_SECRET_KEY,
    }),

    // Two-factor authentication
    // twoFactor({
    //   otpOptions: {
    //     async sendOTP({ user, otp }, request) {
    //       await sendEmail({
    //         to: user.email!,
    //         subject: 'Your Kappa Theta PI verification code',
    //         html: `<p>Your verification code is: <strong>${otp}</strong></p>
    //                <p>It will expire in 5 minutes.</p>`,
    //       });
    //     },
    //     expiresIn: 5 * 60, // 5 minutes
    //   },
    // }),

    // // Magic link authentication
    // magicLink({
    //   sendMagicLink: async ({ email, token, url }, request) => {
    //     await sendEmail({
    //       to: email,
    //       subject: 'Sign in to Kappa Theta PI',
    //       html: `<p>Click <a href="${url}">here</a> to sign in to your account.</p>
    //              <p>This link will expire in 10 minutes.</p>`,
    //     });
    //   },
    //   expiresIn: 10 * 60, // 10 minutes
    // }),

    // JWT plugin for Supabase integration
    jwt({
      jwks: {
        keyPairConfig: {
          alg: 'EdDSA',
          crv: 'Ed25519',
        },
      },
      jwt: {
        issuer: getURL(),
        audience: getURL(),
        expirationTime: '30d', // Match session maxAge
        definePayload: ({ session, user }) => ({
          aud: session.id ? 'authenticated' : 'public',
          sub: user?.id || '',
          email: user?.email || '',
          role: user?.role || 'GUEST',
          profile: user?.profile
            ? {
                id: user.profile.id,
                role: user.profile.role,
              }
            : null,
        }),
      },
    }),

    nextCookies(),
  ],
} satisfies BetterAuthOptions;
