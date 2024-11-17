import { LoginForm } from '@/app/(auth)/_components';

/**
 * The main login page component that serves as the entry point for user authentication.
 * 
 * This component renders the LoginForm which handles user credentials input and authentication.
 * It's designed to be used as a page component in the application's routing structure.
 * 
 * @component LoginPage
 * @returns {JSX.Element} A React component that renders the LoginForm
 * @example
 * ```tsx
 * // Usage in router
 * import LoginPag
 e from './LoginPage';
 * 
 * // Route definition
 * <Route path="/login" element={<LoginPage />} />
 * ```
 */
const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
