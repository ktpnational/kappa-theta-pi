import 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { DefaultSession } from 'next-auth';
import type { Provider } from 'next-auth/providers';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    role?: Role;
  }

  interface Session extends DefaultSession {
    user: User & {
      id: string;
      role: Role;
    };
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
