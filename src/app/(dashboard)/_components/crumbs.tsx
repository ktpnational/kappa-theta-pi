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
 * Breadcrumb navigation component that displays the current page location and ancestral routes
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<{name: string, href: string}>} props.routes - Array of route objects containing names and URLs for ancestor pages
 * @param {string} props.routes[].name - Display name for the route
 * @param {string} props.routes[].href - URL for the route
 * @param {string} props.current - Name of the current page
 *
 * @example
 * ```tsx
 * const routes = [
 *   { name: 'Home', href: '/' },
 *   { name: 'Products', href: '/products' }
 * ];
 *
 * <Crumbs
 *   routes={routes}
 *   current="Product Details"
 * />
 * ```
 *
 * @returns {React.JSX.Element} Breadcrumb navigation component with sidebar trigger
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
