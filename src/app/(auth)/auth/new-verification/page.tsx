/**
 * @fileoverview New verification page component that renders the verification form
 * for user email/account verification processes.
 */

import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'New Verification',
});

const NewVerificationForm = dynamic(() =>
  import('@/app/(auth)/_components').then((mod) => mod.NewVerificationForm),
);

/**
 * Component that handles the verification page view and renders the verification form.
 * This page is typically accessed after a user signs up or requests email verification.
 *
 * @component
 * @returns {React.JSX.Element} Rendered NewVerificationForm component
 * @example
 * ```tsx
 * <NewVerificationPage />
 * ```
 */
const NewVerificationPage = () => {
  return <NewVerificationForm />;
};

NewVerificationPage.displayName = 'NewVerificationPage';
export default NewVerificationPage;
