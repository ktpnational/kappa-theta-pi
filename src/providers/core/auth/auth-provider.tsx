'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

/**
 * Authentication provider component that wraps the application with session context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @param {Session} props.session - Initial session data passed from server
 * @returns {React.ReactElement} Session provider component with children
 */
export const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
