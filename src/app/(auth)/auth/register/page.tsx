/**
 * @module RegisterPage
 * @description A page component responsible for rendering the user registration interface
 * @since 1.0.0
 * @example
 * // Example usage in routing
 * <Route path="/register" component={RegisterPage} />
 */
import { RegisterForm } from '@/app/(auth)/_components';

/**
 * The RegisterPage component - Displays the registration form for new users
 * @function RegisterPage
 * @returns {JSX.Element} A React component containing the registration form
 * @description Renders the RegisterForm component which handles user registration functionality
 * @example
 * // Basic usage
 * <RegisterPage />
 */
const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
