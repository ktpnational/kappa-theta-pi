import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Reset',
});

const ResetForm = dynamic(() => import('@/app/(auth)/_components').then((mod) => mod.ResetForm));

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

ResetPage.displayName = 'ResetPage';
export default ResetPage;
