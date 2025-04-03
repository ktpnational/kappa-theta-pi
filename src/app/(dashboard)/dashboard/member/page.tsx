import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/prisma';
import { auth } from '@/server';
import { constructMetadata } from '@/utils';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = constructMetadata({
  title: 'Member Dashboard',
});

const DashboardMemberPage = async () => {
  
};

DashboardMemberPage.displayName = 'DashboardMemberPage';
export default DashboardMemberPage;
