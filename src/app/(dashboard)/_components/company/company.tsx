'use client';

import { Icons } from '@/components';
import { Globe, Building2, CalendarDays, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Company } from '@prisma/client'

interface CompanyProps extends Company { }

const DashboardCompany: React.FC<CompanyProps> = React.memo(({
  id,
  profileId,
  companyName,
  website,
  industry,
  createdAt,
  updatedAt,
}) => {
  if (!profile?.company) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-xl bg-background/50 border"
      >
        <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
        <p className="text-muted-foreground">Please complete your company profile to continue.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 rounded-xl bg-background/50 border"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          {companyName}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {website && (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="p-4 rounded-lg bg-muted/20 border"
          >
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-sm font-medium text-muted-foreground">Website</h2>
            </div>
            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              {new URL(website).hostname}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {industry && (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="p-4 rounded-lg bg-muted/20 border"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icons.industry className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-sm font-medium text-muted-foreground">Industry</h2>
            </div>
            <p className="text-lg font-medium">{industry}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          className="p-4 rounded-lg bg-muted/20 border"
        >
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">Created</h2>
          </div>
          <p className="text-lg font-medium">
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
})

DashboardCompany.displayName = 'DashboardCompany';
export default DashboardCompany;
