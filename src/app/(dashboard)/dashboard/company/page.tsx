import { DataLoader } from '@/server';
import { constructMetadata } from '@/utils';
import type { Company } from '@prisma/client';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'Company Dashboard',
  description: 'Manage your company profile and view candidates',
});

const DashboardCompany = dynamic(() => import('@/app/(dashboard)/_components/company/company'), {
  ssr: false,
});

const DashboardCompanyPage = async () => {
  return (
    <DataLoader<Company> type="elysia" apiPath="/api/v1/company/profile">
      {(data) => <DashboardCompany {...data} />}
    </DataLoader>
  );
};

DashboardCompanyPage.displayName = 'DashboardCompanyPage';
export default DashboardCompanyPage;
