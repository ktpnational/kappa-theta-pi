import { constructMetadata } from '@/utils';
import React from 'react';

export const metadata = constructMetadata({
  title: 'Member',
});

const DashboardMemberPage = () => {
  return <div>Member</div>;
};

DashboardMemberPage.displayName = 'DashboardMemberPage';

export default DashboardMemberPage;
