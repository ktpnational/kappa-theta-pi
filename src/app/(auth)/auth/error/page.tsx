import dynamic from 'next/dynamic';

const ErrorCard = dynamic(() => import('@/app/(auth)/_components').then((mod) => mod.ErrorCard));

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
 * @returns {React.JSX.Element} A div container wrapping the ErrorCard component
 *
 * @see {@link ErrorCard} For the actual error message display implementation
 */
const AuthErrorPage = () => {
  return <ErrorCard />;
};

AuthErrorPage.displayName = 'AuthErrorPage';
export default AuthErrorPage;
