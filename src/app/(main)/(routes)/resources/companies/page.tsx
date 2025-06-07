import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'Companies',
  description: 'Companies',
});

const ResourcesCompanies = dynamic(
  () =>
    import('@/app/(main)/(routes)/_components/resources/companies/companies').then(
      (mod) => mod.Companies,
    ),
  {
    ssr: true,
  },
);

const ResourcesCompaniesPage = async () => {
  return <ResourcesCompanies />;
};

ResourcesCompaniesPage.displayName = 'ResourcesCompaniesPage';
export default ResourcesCompaniesPage;
