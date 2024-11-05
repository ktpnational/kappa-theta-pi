import { db } from '@/lib';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { Role } from '@prisma/client';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import NextAuth, { type Account, type Session, type User, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

/**
 * NextAuth configuration options.
 * @type {NextAuthOptions}
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          emailVerified: profile.email_verified,
          role: Role.USER,
        };
      },
    }),
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
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter your email and password');
          }

          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await db.user.findUnique({
            where: { email },
            include: {
              profile: {
                select: {
                  role: true,
                  active: true,
                },
              },
            },
          });

          if (!user) throw new Error('No user found with this email');
          if (!user.password) {
            throw new Error('Please sign in with the method you used to create your account');
          }
          if (!user.profile?.active) throw new Error('Your account has been deactivated');

          const passwordMatch = await compare(password, user.password);
          if (!passwordMatch) throw new Error('Incorrect password');

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: user.emailVerified,
            role: user.profile?.role || Role.USER,
          };
        } catch (error) {
          if (error instanceof z.ZodError && error.errors[0]) {
            throw new Error(error.errors[0].message);
          }
          throw error;
        }
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin',
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account }) {
      if (account?.provider === 'google') {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
          include: {
            profile: {
              select: { active: true },
            },
          },
        });

        if (existingUser?.profile?.active === false) {
          throw new Error('Your account has been deactivated');
        }

        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
              profile: {
                create: {
                  role: Role.USER,
                  active: true,
                },
              },
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }: { token: any; user: User; account: Account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || Role.USER;
        if (account) {
          token.provider = account.provider;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      const signingSecret = process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET;

      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.id,
          email: token.email,
          role: token.role || 'authenticated',
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

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

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
