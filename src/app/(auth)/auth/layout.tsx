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
    <div
      className="
          h-full flex items-center justify-center
          bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-600 to-neutral-900
        "
    >
      {children}
    </div>
  );
};

export default AuthLayout;
