import { ResetForm } from '@/app/(auth)/_components';

/**
 * ResetPage Component
 *
 * @description A React functional component that renders the password reset form page.
 * This component serves as the container for the ResetForm component, which handles
 * the password reset functionality.
 *
 * @component
 * @example
 * return (
 *   <ResetPage />
 * )
 *
 * @returns {JSX.Element} A React element containing the ResetForm component
 * @see ResetForm
 */
const ResetPage = (): JSX.Element => {
  return <ResetForm />;
};

export default ResetPage;
