import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'History',
  description: 'The history of Kappa Theta Pi',
});

const History = dynamic(
  () =>
    import('@/app/(main)/(routes)/_components/about/history/history').then((mod) => mod.History),
  {
    ssr: true,
  },
);

const AboutHistoryPage = async () => {
  return <History />;
};

AboutHistoryPage.displayName = 'AboutHistoryPage';
export default AboutHistoryPage;
