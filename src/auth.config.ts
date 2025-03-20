import { getUserByEmail } from '@/data/user';
import { env } from '@/env';
import { LoginSchema } from '@/schemas';
import { logger } from '@/utils';
import bcrypt from 'bcryptjs';
import type NextAuthConfig from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const log = logger.getSubLogger({
  name: 'auth.config',
});

export default {
  providers: [
    Google({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // Define the required fields for the Credentials provider
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * Authorizes a user based on provided credentials.
       * @param {Object} credentials - The credentials object containing user input.
       * @returns {Promise<Object|null>} - Returns the user object if authorization is successful, otherwise null.
       */
      async authorize(credentials) {
        log.info('Authorizing user');
        if (!credentials) return null;

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        log.error('Invalid credentials');
        return null;
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: env.NEXT_PUBLIC_RESEND_HOST,
    //     port: Number(env.NEXT_PUBLIC_RESEND_PORT),
    //     auth: {
    //       user: env.NEXT_PUBLIC_RESEND_USERNAME,
    //       pass: env.NEXT_PUBLIC_RESEND_API_KEY,
    //     },
    //   },
    //   from: env.NEXT_PUBLIC_RESEND_EMAIL_FROM,
    //   async sendVerificationRequest({
    //     identifier,
    //     url,
    //   }: {
    //     identifier: string;
    //     url: string;
    //   }) {
    //     try {
    //       await resend.emails.send({
    //         from: env.NEXT_PUBLIC_RESEND_EMAIL_FROM,
    //         to: [identifier],
    //         subject: `${app.name} magic link sign in`,
    //         react: MagicLinkEmail({ identifier, url }),
    //       });

    //       log.info('Verification email sent');
    //     } catch (error) {
    //       log.error(error, 'Failed to send verification email');
    //       throw new Error('Failed to send verification email');
    //     }
    //   },
    // }),
  ],
} satisfies Parameters<typeof NextAuthConfig>[2];
