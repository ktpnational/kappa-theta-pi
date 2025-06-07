import { AppSidebar } from '@/components';
import { SidebarInset, SidebarProvider } from '@/components/ui';
import { constructMetadata } from '@/utils';
import type React from 'react';
import { DashboardProvider } from '../_providers';

export const metadata = constructMetadata({
  title: 'Dashboard',
});

/**
 * Layout component that provides the main dashboard structure with sidebar navigation.
 *
 * This component wraps its children in the necessary sidebar context and layout components.
 * It uses SidebarProvider to manage sidebar state and provides the main application
 * navigation through AppSidebar. Content is rendered within SidebarInset which provides
 * proper layout spacing and positioning relative to the sidebar.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be rendered within the dashboard layout
 * @returns {React.JSX.Element} Dashboard layout structure with sidebar and main content area
 *
 * @example
 * ```tsx
 * <DashboardLayout>
 *   <DashboardContent />
 * </DashboardLayout>
 * ```
 */
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
};

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
