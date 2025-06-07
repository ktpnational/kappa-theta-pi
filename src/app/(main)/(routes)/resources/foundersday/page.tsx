import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Kappa Theta Pi | Founders Day',
  description: 'Kappa Theta Pi | Founders Day',
});

const FoundersDay = dynamic(
  () =>
    import('@/app/(main)/(routes)/_components/resources/foundersday/foundersday').then(
      (mod) => mod.FoundersDay,
    ),
  {
    ssr: true,
  },
);

const ResourcesFoundersDayPage = async () => {
  return <FoundersDay />;
};

ResourcesFoundersDayPage.displayName = 'ResourcesFoundersDayPage';
export default ResourcesFoundersDayPage;
