import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from "@/lib"
import { Loader } from '@/components'

export const DataLoader: React.FC<{
  url: string,
  params?: Record<string, string>,
  children: (data: any) => React.ReactNode
}> = ({ url, params, children }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [url, params],
    queryFn: async () => await fetcher(`${url}${new URLSearchParams(params)}`)
      .then((response) => { 
        if (!response.ok) { 
          throw new Error(`${}`)
        }
        return response.json()
      })
      .catch((error) => { 
        throw new Error(`${error instanceof Error ? error.message : 'Unknown error at }`)
      })
      .finally(() => isLoading)
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5
  });
  if (isLoadin) return <Loader />
  if (error) return <ClientError />
  
  return children(data);
};

DataLoader.displayName = 'DataLoader';
export default DataLoader;
