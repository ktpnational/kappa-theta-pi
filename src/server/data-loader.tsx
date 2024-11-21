import { ClientError, Loader } from '@/components'
import { fetcher } from "@/lib"
import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { catchError, parseCodePath } from '@/utils';
import { client_api } from '@/providers';

export const DataLoader: React.FC<{
  url: string,
  params?: Record<string, string>,
  children: (data: any) => React.ReactNode
}> = ({ url, params, children }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [url, params],
    queryFn: async () => await fetcher<any>(`${url}${new URLSearchParams(params)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.statusText} at DataLoader`)
        }
        return response.json()
      })
      .catch((error) => {
        throw new Error(`${error instanceof Error ? error.message : 'Unknown error at DataLoader'}`)
      })
      .finally(() => isLoading),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5
  });
  if (isLoading) return <Loader />
  if (error) return <ClientError error={error} />

  return children(data);
};

DataLoader.displayName = 'DataLoader';
export default DataLoader;
