import { DataLoader } from '@/server';
import { constructMetadata } from '@/utils';
import type {
  Profile,
  Chapter,
  Resume,
  Member
} from '@prisma/client';
import type { Metadata } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

const DashboardMember = dynamic(() => import('../../_components/member/member'), {
  ssr: true,
});

interface MemberProps extends Member {
  profile: Profile
  chapter: Chapter
  resume: Resume
}


export const metadata: Metadata = constructMetadata({
  title: 'Member Dashboard',
});

const DashboardMemberPage = async () => {
  return (
    <DataLoader<MemberProps> type="elysia" apiPath="/api/v1/member/profile">
      {(data) => <DashboardMember {...data} />}
    </DataLoader>
  );
};

DashboardMemberPage.displayName = 'DashboardMemberPage';
export default DashboardMemberPage;
