import { constructMetadata } from '@/utils';
import type { Metadata } from 'next';
import { elysia_api } from '@/providers';
import { DataLoader } from '@/server';
import dynamic from 'next/dynamic';
import { Company } from '@prisma/client';

export const metadata: Metadata = constructMetadata({
  title: 'Company Dashboard',
  description: 'Manage your company profile and view candidates',
});

const DashboardCompany = dynamic(() => import('@/app/(dashboard)/_components/company/company'), {
  ssr: false
})

const DashboardCompanyPage = async () => {
  try {
    const profile = await elysia_api('/api/v1/company/profile', {
      method: 'GET'
    }).then(res => res.data?.data)
    return (
      <DataLoader<Company>
        type='elysia'
        apiPath="api.v1.company.profile"
      >
        {(data) => <DashboardCompany {...data} />}
      </DataLoader>
    )
  } catch (err) {

  }
}

DashboardCompanyPage.displayName = 'DashboardCompanyPage';
export default DashboardCompanyPage;
