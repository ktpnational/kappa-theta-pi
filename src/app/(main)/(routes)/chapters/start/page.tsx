import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Start a Chapter',
  description: 'Start a Chapter of Kappa Theta Pi',
});

const Start = dynamic(
  () => import('@/app/(main)/(routes)/_components/chapters/start/start').then((mod) => mod.Start),
  {
    ssr: true,
  },
);

const ChapterStartPage = async () => {
  return <Start />;
};

ChapterStartPage.displayName = 'ChapterStartPage';
export default ChapterStartPage;
