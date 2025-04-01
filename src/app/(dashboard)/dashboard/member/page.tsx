import { constructMetadata } from '@/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { db } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = constructMetadata({
  title: 'Member Dashboard',
});

const DashboardMemberPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/login');
  }

  // Get the user's profile and associated member data
  const profile = await db.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      member: {
        include: {
          chapter: true,
          resume: true
        }
      }
    }
  });

  if (!profile) {
    return <div className="p-6">Profile not found. Please contact an administrator.</div>;
  }

  if (!profile.member) {
    return <div className="p-6">Member information not found. Please complete your profile setup.</div>;
  }

  const { member } = profile;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Member Dashboard</h1>

      {/* Member Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session.user.image || ''} alt={session.user.name || 'Member'} />
              <AvatarFallback>{session.user.name?.charAt(0) || 'M'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{session.user.name}</CardTitle>
              <CardDescription>{session.user.email}</CardDescription>
            </div>
          </div>
          <Badge variant="outline">{profile.active ? 'Active' : 'Inactive'}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Chapter Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Chapter Name:</div>
              <div>{member.chapter.name}</div>
              <div className="text-sm text-muted-foreground">Greek Name:</div>
              <div>{member.chapter.greekName}</div>
              <div className="text-sm text-muted-foreground">University:</div>
              <div>{member.chapter.university}</div>
              <div className="text-sm text-muted-foreground">Location:</div>
              <div>{member.chapter.location}</div>
              <div className="text-sm text-muted-foreground">Status:</div>
              <div>{member.chapter.status}</div>
            </div>
          </div>

          {/* Resume Summary */}
          <div>
            <h3 className="text-lg font-semibold">Resume Summary</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Education:</span>
                <span>{member.resume.education ? `${Object.keys(member.resume.education).length} entries` : 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Experience:</span>
                <span>{member.resume.experience ? `${Object.keys(member.resume.experience).length} entries` : 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Skills:</span>
                <span>{member.resume.skills ? `${Object.keys(member.resume.skills).length} entries` : 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="text-lg font-semibold">Account Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Member Since:</div>
              <div>{new Date(member.createdAt).toLocaleDateString()}</div>
              <div className="text-sm text-muted-foreground">Last Updated:</div>
              <div>{new Date(member.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

DashboardMemberPage.displayName = 'DashboardMemberPage';
export default DashboardMemberPage;
