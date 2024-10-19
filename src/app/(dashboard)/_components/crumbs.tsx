'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from '@/components/ui';
import React from 'react';
import { memo } from 'react';

export const Crumbs = memo(
  ({
    routes,
    current,
  }: {
    routes: {
      name: string;
      href: string;
    }[];
    current: string;
  }) => {
    return (
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {routes.map((route) => (
                <>
                  <BreadcrumbItem key={route.href}>
                    <BreadcrumbLink href={route.href}>{route.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage>{current}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    );
  },
);

Crumbs.displayName = 'Crumbs';
