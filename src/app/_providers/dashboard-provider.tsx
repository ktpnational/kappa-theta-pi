'use client';

import { Providers, QueryProvider, ThemeProvider } from '@/providers';
// import type { Session } from 'next-auth';
import type React from 'react';

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Providers
      providers={[
        // [AuthProvider, { session }],
        [QueryProvider, {}],
        [ThemeProvider, {}],
      ]}
    >
      {children}
    </Providers>
  );
};

DashboardProvider.displayName = 'DashboardProvider';
export { DashboardProvider };
