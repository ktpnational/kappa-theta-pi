import { redirect } from 'next/navigation';

const AuthPage = async () => {
  return redirect('/auth/login');
};

AuthPage.displayName = 'AuthPage';
export default AuthPage;
