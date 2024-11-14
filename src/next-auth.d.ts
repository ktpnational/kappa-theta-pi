import 'next-auth';
import type { Role } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import type { DefaultSession } from 'next-auth';
import type { Provider } from 'next-auth/providers';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
      name: string;
      email: string;
    } & DefaultSession['user'];
    supabaseAccessToken?: string;
  }

  interface NextAuthOptions {
    providers: Provider[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: Role;
  }
}
