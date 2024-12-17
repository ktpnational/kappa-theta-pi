import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Login',
});

const LoginForm = dynamic(() => import('@/app/(auth)/_components').then((mod) => mod.LoginForm));

/**
 * The main login page component that serves as the entry point for user authentication.
 *
 * This component renders the LoginForm which handles user credentials input and authentication.
 * It's designed to be used as a page component in the application's routing structure.
 *
 * @component LoginPage
 * @returns {React.JSX.Element} A React component that renders the LoginForm
 * @example
 * ```tsx
 * // Usage in router
 * import LoginPage from './LoginPage';
 *
 * // Route definition
 * <Route path="/login" element={<LoginPage />} />
 * ```
 */
const LoginPage = () => {
  return <LoginForm />;
};

LoginPage.displayName = 'LoginPage';
export default LoginPage;
