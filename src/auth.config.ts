import { MagicLinkEmail } from '@/components';
import { app } from '@/constants';
import { getUserByEmail } from '@/data/user';
import { resend } from '@/lib';
import { LoginSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import ResendProvider from 'next-auth/providers/resend';

export default {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      /**
       * Authorizes a user based on provided credentials.
       * @param {Object} credentials - The credentials object containing user input.
       * @returns {Promise<Object|null>} - Returns the user object if authorization is successful, otherwise null.
       */
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    ResendProvider({
      server: {
        host: process.env.RESEND_HOST,
        port: Number(process.env.RESEND_PORT),
        auth: {
          user: process.env.RESEND_USERNAME,
          pass: process.env.RESEND_API_KEY,
        },
      },
      async sendVerificationRequest({
        identifier,
        url,
      }: {
        identifier: string;
        url: string;
      }) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_EMAIL_FROM,
            to: [identifier],
            subject: `${app.name} magic link sign in`,
            react: MagicLinkEmail({ identifier, url }),
          });

          console.log('Verification email sent');
        } catch (error) {
          throw new Error('Failed to send verification email');
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
