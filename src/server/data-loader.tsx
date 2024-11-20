import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const DataLoader: React.FC<{
  url: string,
  params?: Record<string, string>,
  children: (data: any) => React.ReactNode
}> = ({ url, params, children }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [url, params],
    queryFn: () => async () => {

    },
  });
  return (
    <div>data-loader</div>
  );
};

DataLoader.displayName = 'DataLoader';
export default DataLoader;
