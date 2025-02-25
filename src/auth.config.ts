import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export default {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
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
        if (!credentials) return null;

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
  ],
} satisfies AuthOptions;
