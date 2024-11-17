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

/**
 * A memoized breadcrumb navigation component that displays the current page location
 * in a hierarchical path structure.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array<{name: string, href: string}>} props.routes - Array of route objects containing
 * name and href for each breadcrumb link in the navigation path
 * @param {string} props.routes[].name - The display text for the breadcrumb link
 * @param {string} props.routes[].href - The URL that the breadcrumb link points to
 * @param {string} props.current - The name of the current page to display as the final breadcrumb
 *
 * @example
 * ```jsx
 * <Crumbs
 *   routes={[
 *     { name: "Home", href: "/" },
 *     { name: "Products", href: "/products" }
 *   ]}
 *   current="Product Details"
 * />
 * ```
 *
 * @returns {JSX.Element} A header containing a breadcrumb navigation component with
 * a sidebar trigger, separator, and breadcrumb trail
 */
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
