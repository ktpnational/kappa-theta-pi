import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';
import SuperJSON from 'superjson';

/**
 * A reusable fetch utility to handle query requests.
 * This can be shared across different queries.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - The parsed JSON response.
 * @throws {Error} - If the network response is not ok.
 */
const fetchWithSuperJSON = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const text = await response.text();
  return SuperJSON.parse(text);
};

/**
 * Create a memoized QueryClient for React Query.
 * This ensures the client is only created once and reused on re-renders.
 *
 * @returns {QueryClient} - The memoized QueryClient instance.
 */
export const createQueryClient = (() => {
  let queryClient: QueryClient | null = null;

  return (): QueryClient => {
    if (!queryClient) {
      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
            queryFn: async ({ queryKey }) => fetchWithSuperJSON(queryKey[0] as string),
            retry: 2,
            retryOnMount: false,
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
    }
    return queryClient;
  };
})();
