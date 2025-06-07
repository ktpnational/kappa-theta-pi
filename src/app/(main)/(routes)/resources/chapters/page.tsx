import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'Chapters',
  description: 'Chapters',
});

const ResourcesChapters = dynamic(
  () =>
    import('@/app/(main)/(routes)/_components/resources/chapters/chapters').then(
      (mod) => mod.ResourceChapters,
    ),
  {
    ssr: true,
  },
);

const ResourcesChaptersPage = async () => {
  return <ResourcesChapters />;
};

ResourcesChaptersPage.displayName = 'ResourcesChaptersPage';
export default ResourcesChaptersPage;
