import { constructMetadata } from '@/utils';
import { redirect } from 'next/navigation';

export const metadata = constructMetadata({
  title: 'Join Us',
  description: 'Join Us',
});

const JoinUsPage = async () => {
  redirect('/chapters');
};

JoinUsPage.displayName = 'JoinUsPage';
export default JoinUsPage;
