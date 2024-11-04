import { db } from '@/lib';
import { Role } from '@prisma/client';
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@domain.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            profile: {
              select: {
                role: true,
                active: true,
              },
            },
          },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.password) {
          throw new Error('Please sign in with the method you used to create your account');
        }

        if (!user.profile?.active) {
          throw new Error('Your account has been deactivated');
        }

        const passwordMatch = await compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return user.email
          ? {
              id: user.id,
              email: user.email,
              name: user.name ?? '',
              image: user.image,
              emailVerified: user.emailVerified,
              role: user.profile?.role || Role.USER,
            }
          : null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role || Role.USER,
        },
      };
    },
  },
};
