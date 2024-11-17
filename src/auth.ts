import authConfig from '@/auth.config';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getUserById } from '@/data/user';
import { db } from '@/lib';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import { getAccountByUserId } from './data/account';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.AUTH_SECRET,
  events: {
    /**
     * Event triggered when a user links an account.
     * @param {Object} param - The parameter object.
     * @param {Object} param.user - The user object.
     */
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    /**
     * Callback triggered during sign-in.
     * @param {Object} param - The parameter object.
     * @param {Object} param.user - The user object.
     * @param {Object} param.account - The account object.
     * @returns {Promise<boolean>} - Returns true if sign-in is allowed, false otherwise.
     */
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    /**
     * Callback triggered when a session is created or updated.
     * @param {Object} param - The parameter object.
     * @param {Object} param.token - The token object.
     * @param {Object} param.session - The session object.
     * @returns {Promise<Object>} - Returns the updated session object.
     */
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      // TODO: check schema for both database andd enxt_auth
      // getting nullish coellacent fixes, which should not be the case
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email ?? '';
        session.user.isOAuth = token.isOAuth as boolean;
      }

      // Add Supabase JWT token generation
      const signingSecret = process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET;
      if (signingSecret && token.sub && token.email) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.sub,
          email: token.email,
          role: 'authenticated',
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

      return session;
    },
    /**
     * Callback triggered when a JWT is created or updated.
     * @param {Object} param - The parameter object.
     * @param {Object} param.token - The token object.
     * @returns {Promise<Object>} - Returns the updated token object.
     */
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  ...authConfig,
});
