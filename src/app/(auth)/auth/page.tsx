import { auth } from '@/auth';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
