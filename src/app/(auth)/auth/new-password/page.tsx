import { NewPasswordForm } from '@/app/(auth)/_components';

/**
 * Page component that handles rendering the new password form.
 *
 * This component is responsible for displaying the form where users can set
 * their new password, typically used in password reset flows.
 *
 * @component
 * @returns {JSX.Element} Renders the NewPasswordForm component
 * @example
 * // Standard usage
 * return (
 *   <NewPasswordPage />
 * )
 *
 * @see {@link NewPasswordForm} The form component being rendered
 * @category Pages
 * @subcategory Auth
 */
const NewPasswordPage = () => {
  return <NewPasswordForm />;
};

export default NewPasswordPage;
