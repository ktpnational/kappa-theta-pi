import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';
import SuperJSON from 'superjson';

/**
 * QueryProvider component
 * Sets up a QueryClientProvider for React Query to manage and cache API requests.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 */
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
        queryFn: async ({ queryKey }) => {
          const response = await fetch(queryKey[0] as string);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const text = await response.text();
          return SuperJSON.parse(text);
        },
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
