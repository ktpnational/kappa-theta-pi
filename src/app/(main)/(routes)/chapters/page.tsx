import { chapters } from '@/constants';
import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Kappa Theta Pi | Chapters',
  description: 'Kappa Theta Pi | Chapters',
});

const Chapters = dynamic(
  () => import('@/app/(main)/(routes)/_components/chapters/chapters').then((mod) => mod.Chapters),
  {
    ssr: true,
  },
);

const ChaptersPage = async () => {
  return <Chapters chapters={chapters} />;
};

ChaptersPage.displayName = 'ChaptersPage';
export default ChaptersPage;
