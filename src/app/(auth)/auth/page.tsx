import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { headers } from 'next/headers';

const ServiceUnavailableError = dynamic(
  () => import('@/app/_client').then((mod) => mod.ServiceUnavailableError),
  {
    ssr: true,
  },
);

const AuthPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <>
      {session ? (
        redirect(`${session ? '/dashboard' : '/auth/login'}`)
      ) : (
        <ServiceUnavailableError />
      )}
    </>
  );
};

AuthPage.displayName = 'AuthPage';
export default AuthPage;
