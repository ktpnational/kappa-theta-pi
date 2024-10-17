import type { Role } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
import NextAuth, { type DefaulSessions } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      role: string;
    } & DefaulSessions['user'];
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
