import { ErrorCard } from '@/app/(auth)/_components/error-card';

/**
 * Authentication Error Page Component
 *
 * This component serves as a dedicated error page for authentication-related issues.
 * It renders a centralized error message using the ErrorCard component.
 *
 * @component
 * @example
 * return (
 *   <AuthErrorPage />
 * )
 *
 * @returns {JSX.Element} A div container wrapping the ErrorCard component
 *
 * @see {@link ErrorCard} For the actual error message display implementation
 */
const AuthErrorPage = () => {
  return (
    <div>
      <ErrorCard />
    </div>
  );
};

export default AuthErrorPage;
