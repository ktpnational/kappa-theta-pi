import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'New Password',
});

const NewPasswordForm = dynamic(() =>
  import('@/app/(auth)/_components').then((mod) => mod.NewPasswordForm),
);

/**
 * Page component that handles rendering the new password form.
 *
 * This component is responsible for displaying the form where users can set
 * their new password, typically used in password reset flows.
 *
 * @component
 * @returns {React.JSX.Element} Renders the NewPasswordForm component
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
