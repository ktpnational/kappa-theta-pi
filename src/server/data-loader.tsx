'use client';

import { ClientError, Loader } from '@/components';
import { fetcher } from '@/lib';
import { client_api } from '@/providers/core/server/react';
import { catchError, parseCodePath } from '@/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import type React from 'react';
import { Suspense } from 'react';

/**
 * Type representing valid API method names from the client_api object
 * @typedef {keyof typeof client_api} ApiMethod
 */
type ApiMethod = keyof typeof client_api;

/**
 * Configuration options for fetch requests
 * @typedef {Object} FetchConfig
 * @property {Request['method']} [method] - HTTP method to use for the request
 * @property {Record<string, string>} [headers] - Custom headers to include with the request
 */
type FetchConfig = {
  method?: Request['method'];
  headers?: Record<string, string>;
};

/**
 * Structure of a successful fetch response
 * @typedef {Object} FetchResponse
 * @template T - Type of the response data
 * @property {number} status - HTTP status code
 * @property {string} statusText - HTTP status message
 * @property {T} data - Response payload
 */
type FetchResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};

/**
 * Props specific to Elysia API endpoints
 * @typedef {Object} ElysiaProp
 * @property {'elysia'} type - Identifier for Elysia endpoint type
 * @property {ApiMethod} apiPath - Path to the Elysia API method
 */
type ElysiaProp = {
  type: 'elysia';
  apiPath: ApiMethod;
};

/**
 * Props specific to NextJS API endpoints
 * @typedef {Object} NextJSProp
 * @property {'nextjs'} type - Identifier for NextJS endpoint type
 * @property {string} url - URL of the NextJS API endpoint
 * @property {FetchConfig} [config] - Optional fetch configuration
 */
type NextJSProp = {
  type: 'nextjs';
  url: string;
  config?: FetchConfig;
};

/**
 * Props for the DataLoader component
 * @typedef {Object} DataLoaderProps
 * @template T - Type of the data being loaded
 * @property {(data: T) => React.ReactNode} children - Render function that receives the loaded data
 * @property {Record<string, unknown> | { id: string | number }} [params] - Optional query parameters or ID object
 * @property {ElysiaProp | NextJSProp} props - API endpoint configuration (either Elysia or NextJS)
 */
type DataLoaderProps<T> = {
  children: (data: T) => React.ReactNode;
  params?: Record<string, unknown> | { id: string | number };
} & (ElysiaProp | NextJSProp);

/**
 * A versatile data loading component that supports both Elysia and NextJS API endpoints.
 * Handles data fetching, loading states, and error handling with React Suspense.
 *
 * @template T - Type of the data being loaded
 * @component
 * @param {DataLoaderProps<T>} props - Component props
 * @param {(data: T) => React.ReactNode} props.children - Render function that receives the loaded data
 * @param {Record<string, unknown> | { id: string | number }} [props.params] - Optional query parameters or ID object
 * @param {ElysiaProp | NextJSProp} props.type - API endpoint configuration
 *
 * @example
 * // Using with Elysia endpoint
 * <DataLoader<UserData>
 *   type="elysia"
 *   apiPath="users.getById"
 *   params={{ id: "123" }}
 * >
 *   {(data) => <UserProfile user={data} />}
 * </DataLoader>
 *
 * @example
 * // Using with NextJS endpoint
 * <DataLoader<ProductData>
 *   type="nextjs"
 *   url="/api/products"
 *   params={{ category: "electronics" }}
 * >
 *   {(data) => <ProductList products={data} />}
 * </DataLoader>
 *
 * @returns {JSX.Element} Rendered component with loading, error, or data states
 */
export const DataLoader = <T,>({ children, params, ...props }: DataLoaderProps<T>) => {
  const { data, error } = useSuspenseQuery<T, Error>({
    queryKey: [props.type === 'elysia' ? props.apiPath : props.url, params],
    queryFn: async () => {
      if (props.type === 'elysia') {
        const apiMethod = client_api[props.apiPath as ApiMethod];

        const [fetchError, response] = await catchError(
          typeof apiMethod === 'function'
            ? Promise.resolve(apiMethod(params as Extract<typeof params, { id: string | number }>))
            : Promise.reject(new Error('Invalid API method')),
        );
        if (fetchError) throw fetchError;
        return response as T;
      } else {
        const searchParams = params
          ? `?${new URLSearchParams(params as Record<string, string>)}`
          : '';
        const fullUrl = `${props.url}${searchParams}`;

        const [fetchError, response] = await catchError(
          fetcher<FetchResponse<T>>(fullUrl, props.config).then((res) => {
            if (!res.status.toString().startsWith('2')) {
              throw new Error(`${res.statusText} at DataLoader ${parseCodePath(fullUrl, fetcher)}`);
            }
            return res.data;
          }),
        );

        if (fetchError) throw fetchError;
        return response;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  return (
    <Suspense fallback={<Loader />}>
      {error && <ClientError error={error} />}
      {children(data as T)}
    </Suspense>
  );
};

DataLoader.displayName = 'DataLoader';
export default DataLoader;
