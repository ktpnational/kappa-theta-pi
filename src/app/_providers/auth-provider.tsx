'use client';

// import { AuthProvider as NextAuthProvider, Providers } from '@/providers';
// TODO: NEXT_AUTH
import type React from 'react';

const AuthProvider: React.FC<{ children: React.ReactNode; session: Session | null }> = ({
  children,
  // @ts-ignore
  session,
}) => {
  // <Providers providers={[[NextAuthProvider, { session }]]}>{children}</Providers>;
  return <>{children}</>;
};

AuthProvider.displayName = 'AuthProvider';
export { AuthProvider };
