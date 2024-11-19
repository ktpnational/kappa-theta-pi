/**
 * @fileoverview New verification page component that renders the verification form
 * for user email/account verification processes.
 */

import dynamic from 'next/dynamic';

const NewVerificationForm = dynamic(() =>
  import('@/app/(auth)/_components').then((mod) => mod.NewVerificationForm),
);

/**
 * Component that handles the verification page view and renders the verification form.
 * This page is typically accessed after a user signs up or requests email verification.
 *
 * @component
 * @returns {JSX.Element} Rendered NewVerificationForm component
 * @example
 * ```tsx
 * <NewVerificationPage />
 * ```
 */
const NewVerificationPage = () => {
  return <NewVerificationForm />;
};

export default NewVerificationPage;
