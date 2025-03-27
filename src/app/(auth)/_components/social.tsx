'use client';

import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
// TODO: NEXT_AUTH
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') ?? DEFAULT_LOGIN_REDIRECT;

  const onClick = () => {
    signIn.social;
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick()}>
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export { Social };
