import { constructMetadata } from '@/utils';
import { db } from '@/lib/prisma';
import { auth } from '@/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = constructMetadata({
  title: 'Company Dashboard',
  description: 'Manage your company profile and view candidates'
});

export default async function DashboardCompanyPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/login');
  }

  // Get the user's profile and associated company data
  const profile = await db.profile.findUnique({
    where: { userId: session.user.id },
    include: { company: true }
  });

  if (!profile?.company) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
        <p>Please complete your company profile to continue.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Company Name</h2>
          <p>{profile.company.companyName}</p>
        </div>

        {profile.company.website && (
          <div>
            <h2 className="text-lg font-semibold">Website</h2>
            <p>{profile.company.website}</p>
          </div>
        )}

        {profile.company.industry && (
          <div>
            <h2 className="text-lg font-semibold">Industry</h2>
            <p>{profile.company.industry}</p>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold">Created</h2>
          <p>{profile.company.createdAt.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
