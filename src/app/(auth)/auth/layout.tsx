import { AnimatedBackground } from '@/components';
import { constructMetadata } from '@/utils';

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
 * @returns {JSX.Element} Authentication layout wrapper with centered content and gradient background
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
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="
          min-h-screen flex items-center justify-center container mx-auto
        "
    >
      {children}
      <AnimatedBackground />
    </main>
  );
};

AuthLayout.displayName = 'AuthLayout';
export default AuthLayout;
