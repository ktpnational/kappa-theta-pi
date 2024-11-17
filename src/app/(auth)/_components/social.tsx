'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

/**
 * Social authentication component that provides OAuth login options
 * @component
 * @returns {JSX.Element} A button component for social login
 */
const Social = () => {
  /**
   * Hook to access URL search parameters
   * @type {URLSearchParams}
   */
  const searchParams = useSearchParams();

  /**
   * Callback URL extracted from search parameters, used for redirect after authentication
   * @type {string|null}
   */
  const callbackUrl = searchParams.get('callbackUrl');

  /**
   * Handles social login button click
   * @param {('google')} provider - The OAuth provider to use for authentication
   * @returns {void}
   */
  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('google')}>
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export { Social };
