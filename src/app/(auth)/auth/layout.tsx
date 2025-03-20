import { AuthProvider } from '@/app/_providers';
// import { auth } from '@/auth';
import { AnimatedBackground } from '@/components';
import { SHOULD_USE_SUPABASE } from '@/config';
import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

const ServiceUnavailableError = dynamic(
  () => import('@/app/_client').then((mod) => mod.ServiceUnavailableError),
  {
    ssr: true,
  },
);

export const metadata = constructMetadata({
  title: 'Auth',
});

/**
 * Layout component for authentication-related pages
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 *
 * @returns {React.JSX.Element} Authentication layout wrapper with centered content and gradient background
 *
 * @example
 * // Basic usage
 * <AuthLayout>
 *   <LoginForm />
 * </AuthLayout>
 *
 * @description
 * Provides a consistent layout wrapper for authentication pages with:
 * - Full height container
 * - Centered content both vertically and horizontally
 * - Conic gradient background from neutral-900 through neutral-600 back to neutral-900
 * - Flexible child content rendering
 */
const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  // await auth();
  const session = null;
  return (
    <>
      {SHOULD_USE_SUPABASE ? (
        <AuthProvider session={session}>
          <main
            className="
          min-h-screen flex items-center justify-center container mx-auto
          "
          >
            {children}
            <AnimatedBackground />
          </main>
        </AuthProvider>
      ) : (
        <ServiceUnavailableError />
      )}
    </>
  );
};

AuthLayout.displayName = 'AuthLayout';
export default AuthLayout;
