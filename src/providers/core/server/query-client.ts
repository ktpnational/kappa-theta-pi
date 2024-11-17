import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';
import { cache } from 'react';
import SuperJSON from 'superjson';

/**
 * A reusable fetch utility to handle query requests.
 * This can be shared across different queries.
 *
 * The function uses the native fetch API to make HTTP requests and SuperJSON to parse
 * the response data. SuperJSON allows for preservation of data types during serialization/deserialization.
 *
 * @param {string} url - The URL endpoint to fetch data from
 * @returns {Promise<any>} A promise that resolves to the parsed response data
 * @throws {Error} Throws if the network response status is not in the 200-299 range
 * @example
 * try {
 *   const data = await fetchWithSuperJSON('https://api.example.com/data');
 *   console.log(data);
 * } catch (error) {
 *   console.error('Failed to fetch:', error);
 * }
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
 * Creates a memoized QueryClient instance for React Query with predefined configuration.
 * This ensures the client is only created once and reused across re-renders for optimal performance.
 *
 * Configuration includes:
 * - Stale time of 30 seconds
 * - Window focus refetching disabled
 * - Custom query function using fetchWithSuperJSON
 * - 2 retry attempts for failed queries
 * - SuperJSON serialization/deserialization for data hydration
 *
 * @returns {Function} A memoized factory function that returns a QueryClient instance
 * @example
 * const queryClient = createQueryClient();
 *
 * // In your React application:
 * <QueryClientProvider client={queryClient()}>
 *   <App />
 * </QueryClientProvider>
 *
 * @see {@link https://tanstack.com/query/latest/docs/react/reference/QueryClient}
 * @see {@link https://github.com/blitz-js/superjson}
 */
export const createQueryClient = cache(() => {
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
