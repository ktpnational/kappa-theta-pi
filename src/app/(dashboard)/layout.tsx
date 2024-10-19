import { AppSidebar } from '@/components';
import { SidebarInset, SidebarProvider } from '@/components/ui';
import type React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
};

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
