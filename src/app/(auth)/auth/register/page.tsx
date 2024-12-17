import { constructMetadata } from '@/utils';
/**
 * @module RegisterPage
 * @description A page component responsible for rendering the user registration interface
 * @since 1.0.0
 * @example
 * // Example usage in routing
 * <Route path="/register" component={RegisterPage} />
 */
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Register',
});

const RegisterForm = dynamic(() =>
  import('@/app/(auth)/_components').then((mod) => mod.RegisterForm),
);

/**
 * The RegisterPage component - Displays the registration form for new users
 * @function RegisterPage
 * @returns {React.JSX.Element} A React component containing the registration form
 * @description Renders the RegisterForm component which handles user registration functionality
 * @example
 * // Basic usage
 * <RegisterPage />
 */
const RegisterPage = () => {
  return <RegisterForm />;
};

RegisterPage.displayName = 'RegisterPage';
export default RegisterPage;
