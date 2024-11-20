'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/app/(auth)/_components';
import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-sucess';
import { useGlobalStore } from '@/providers';

/**
 * A form component that handles email verification confirmations.
 * This component automatically attempts to verify the user's email using a token from the URL.
 *
 * @component
 * @example
 * ```tsx
 * <NewVerificationForm />
 * ```
 */
const NewVerificationForm = () => {
  const {
    error,
    success,
    setError,
    setSuccess,
    reset: resetAuth,
  } = useGlobalStore((state) => state.auth);

  /** Hook to access URL search parameters */
  const searchParams = useSearchParams();

  /** Verification token extracted from URL query parameters */
  const token = searchParams.get('token');

  /**
   * Handles the verification submission process.
   * Makes a request to verify the user's email with the provided token.
   * Updates success/error states based on the response.
   *
   * @returns {void}
   */
  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error, setError, setSuccess]);

  /**
   * Effect hook that triggers verification on component mount
   * and cleans up state on unmount
   */
  useEffect(() => {
    resetAuth(); // Reset state on mount
    onSubmit();

    // Cleanup on unmount
    return () => resetAuth();
  }, [onSubmit, resetAuth]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        <FormSucess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export { NewVerificationForm };
