'use client';

import type { AppRouter } from '@/server/api/root';
import { getURL } from '@/utils';
import { treaty } from '@elysiajs/eden';

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createQueryClient } from '.';

export const client_api = treaty<AppRouter>(
  typeof window === 'undefined' ? getURL() : window.location.origin,
).api.elysia;

let clientQueryClientSingleton: QueryClient | undefined = undefined;

/**
 * Get or create a QueryClient instance.
 *
 * @returns {QueryClient} - The QueryClient instance.
 */
const getQueryClient = (): QueryClient => {
  if (typeof window === 'undefined') {
    return createQueryClient();
  } else {
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

/**
 * QueryProvider component to provide the QueryClient to the React component tree.
 *
 * @param {React.PropsWithChildren} props - The props containing children components.
 * @returns {JSX.Element} - The QueryClientProvider component wrapping the children.
 */
export const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
