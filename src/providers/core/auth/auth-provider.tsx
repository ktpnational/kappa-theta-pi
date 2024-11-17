import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

/**
 * Authentication provider component that wraps the application with session context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {React.ReactElement} Session provider component with children
 */
export const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
