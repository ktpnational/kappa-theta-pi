'use client';

import { Icons } from '@/components';
import { Badge, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Member } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@/components/ui';
import { profile } from 'console';
import { auth } from '@/server/lib/auth';
import { headers } from 'next/headers';

interface MemberProps extends Member { }
const DashboardMember: React.FC<MemberProps> = React.memo(({
  id,
  profileIdid,
  resumeIdid,
  chapterIdid,
  createdAtid,
  updatedAtid,
}) => {
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
              <div>{name}</div>
              <div className="text-sm text-muted-foreground">Greek Name:</div>
              <div>{greekName}</div>
              <div className="text-sm text-muted-foreground">University:</div>
              <div>{university}</div>
              <div className="text-sm text-muted-foreground">Location:</div>
              <div>{location}</div>
              <div className="text-sm text-muted-foreground">Status:</div>
              <div>{status}</div>
            </div>
          </div>

          {/* Resume Summary */}
          <div>
            <h3 className="text-lg font-semibold">Resume Summary</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Education:</span>
                <span>
                  {member.resume.education
                    ? `${Object.keys(member.resume.education).length} entries`
                    : 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Experience:</span>
                <span>
                  {member.resume.experience
                    ? `${Object.keys(member.resume.experience).length} entries`
                    : 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Skills:</span>
                <span>
                  {member.resume.skills
                    ? `${Object.keys(member.resume.skills).length} entries`
                    : 'Not provided'}
                </span>
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
})

DashboardMember.displayName = 'DashboardMember';
export default DashboardMember