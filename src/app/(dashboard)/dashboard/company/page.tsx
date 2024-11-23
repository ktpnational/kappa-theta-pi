import { constructMetadata } from '@/utils';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'Company',
});

const DashboardCompanyPage = () => {
  return <div>Company</div>;
};

DashboardCompanyPage.displayName = 'DashboardCompanyPage';
export default DashboardCompanyPage;
