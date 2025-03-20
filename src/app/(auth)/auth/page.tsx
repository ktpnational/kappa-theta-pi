import { SHOULD_USE_SUPABASE } from '@/config';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
// import { auth } from '@/auth';
const ServiceUnavailableError = dynamic(
  () => import('@/app/_client').then((mod) => mod.ServiceUnavailableError),
  {
    ssr: true,
  },
);

const AuthPage = async () => {
  const session = null;
  return (
    <>
      {SHOULD_USE_SUPABASE ? (
        redirect(`${session ? '/dashboard' : '/auth/login'}`)
      ) : (
        <ServiceUnavailableError />
      )}
    </>
  );
};

AuthPage.displayName = 'AuthPage';
export default AuthPage;
