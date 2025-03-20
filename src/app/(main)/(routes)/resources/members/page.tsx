import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'Members',
  description: 'Members',
});

const Members = dynamic(
  () =>
    import('@/app/(main)/(routes)/_components/resources/members/members').then(
      (mod) => mod.Members,
    ),
  {
    ssr: true,
  },
);

const ResourcesMembersPage = async () => {
  return <Members />;
};

ResourcesMembersPage.displayName = 'ResourcesMembersPage';
export default ResourcesMembersPage;
