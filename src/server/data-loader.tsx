'use client';

import { ClientError, Loader } from '@/components';
import { fetcher } from '@/lib';
import { elysia_api } from '@/providers/core/server/react';
import { catchError, parseCodePath } from '@/utils';
// import type { EdenFetch } from '@elysiajs/eden/fetch';
import {
  type QueryOptions,
  type UseSuspenseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { Method } from 'axios';
import React from 'react';
import { Suspense } from 'react';

/**
 * Type representing valid API method names from the elysia_api object.
 * These methods are used to make API calls to Elysia endpoints.
 *
 * @typedef {keyof typeof elysia_api} ElysiaApiMethod
 * @category Types
 */
type ElysiaApiMethod = Parameters<typeof elysia_api>[0];
/**
 * Configuration options for fetch requests.
 * Used to customize the HTTP request behavior.
 *
 * @typedef {Object} FetchConfig
 * @property {Request['method']} [method] - HTTP method to use for the request (GET, POST, PUT, etc.)
 * @property {Record<string, string>} [headers] - Custom headers to include with the request
 * @category Types
 */
type FetchConfig = {
  method?: Uppercase<Method>;
  headers?: Record<string, string>;
};

/**
 * Structure of a successful fetch response.
 * Represents the standardized format for API responses.
 *
 * @typedef {Object} FetchResponse
 * @template T - Type of the response data payload
 * @property {number} status - HTTP status code (e.g., 200, 201, etc.)
 * @property {string} statusText - HTTP status message (e.g., "OK", "Created")
 * @property {T} data - Response payload of type T
 * @category Types
 */
type FetchResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};

/**
 * Props specific to Elysia API endpoints.
 * Used when making requests to Elysia backend services.
 *
 * @typedef {Object} ElysiaProp
 * @property {'elysia'} type - Identifier specifying this is an Elysia endpoint
 * @property {ElysiaApiMethod} apiPath - Path to the Elysia API method in elysia_api
 * @category Props
 */
type ElysiaProp<T extends ElysiaApiMethod> = {
  type: 'elysia';
  elysiaParams?: any;
  apiPath: T;
};

/**
 * Props specific to NextJS API endpoints.
 * Used when making requests to NextJS API routes.
 *
 * @typedef {Object} NextJSProp
 * @property {'nextjs'} type - Identifier specifying this is a NextJS endpoint
 * @property {string} [url] - URL of a single NextJS API endpoint
 * @property {string[]} [urls] - Array of URLs for batch requests to NextJS API endpoints
 * @property {FetchConfig} [config] - Optional fetch configuration for the request
 * @category Props
 */
type NextJSProp = {
  type: 'nextjs';
  nextParams?: Record<string, unknown> | { id: string | number };
  url?: string;
  urls?: string[];
  config?: FetchConfig;
};

/**
 * Props for the DataLoader component.
 * Combines common props with either Elysia or NextJS specific props.
 *
 * @typedef {Object} DataLoaderProps
 * @template T - Type of the data being loaded
 * @property {(data: T) => React.ReactNode} children - Render function that receives and renders the loaded data
 * @property {Record<string, unknown> | { id: string | number }} [params] - Query parameters or ID object for the request
 * @property {QueryOptions} [queryOptions] - Additional options for React Query
 * @property {React.ReactNode} [LoadingComponent] - Component to show during loading state
 * @property {React.ComponentType<{ error: Error }> | React.ReactElement} [ErrorComponent] - Component to render errors
 * @property {number} [waitForAll] - Number of parallel requests to wait for when using multiple URLs
 * @category Props
 */
type DataLoaderProps<T> = {
  children: (data: T) => React.ReactNode;
  queryOptions?: QueryOptions;
  LoadingComponent?: React.ReactNode;
  ErrorComponent?: React.ComponentType<{ error: Error }> | React.ReactElement;
  waitForAll?: number;
} & (ElysiaProp<ElysiaApiMethod> | NextJSProp);

/**
 * A versatile data loading component that supports both Elysia and NextJS API endpoints.
 * Provides a unified interface for data fetching with built-in loading states, error handling,
 * and React Suspense integration.
 *
 * Features:
 * - Supports both Elysia and NextJS API endpoints
 * - Handles single and multiple URL requests
 * - Built-in loading and error states
 * - Type-safe data fetching
 * - Configurable caching and refetching
 * - Parallel request support with waitForAll option
 *
 * @template T - Type of the data being loaded
 * @component
 * @param {DataLoaderProps<T>} props - Component props
 * @param {(data: T) => React.ReactNode} props.children - Render function that receives the loaded data
 * @param {Record<string, unknown> | { id: string | number }} [props.params] - Query parameters or ID object
 * @param {QueryOptions} [props.queryOptions] - Additional React Query options
 * @param {React.ReactNode} [props.LoadingComponent=<Loader />] - Custom loading component
 * @param {React.ComponentType<{ error: Error }> | React.ReactElement} [props.ErrorComponent=ClientError] - Custom error component
 * @param {number} [props.waitForAll] - Number of parallel requests to wait for
 * @param {ElysiaProp | NextJSProp} props.type - API endpoint configuration
 *
 * @example
 * // Using with Elysia endpoint for user data
 * <DataLoader<UserData>
 *   type="elysia"
 *   apiPath="users.getById"
 *   params={{ id: "123" }}
 * >
 *   {(data) => <UserProfile user={data} />}
 * </DataLoader>
 *
 * @example
 * // Using with NextJS endpoint for product data with custom loading
 * <DataLoader<ProductData>
 *   type="nextjs"
 *   url="/api/products"
 *   params={{ category: "electronics" }}
 *   LoadingComponent={<CustomSpinner />}
 * >
 *   {(data) => <ProductList products={data} />}
 * </DataLoader>
 *
 * @example
 * // Using with multiple URLs and waiting for specific number of responses
 * <DataLoader<ProductData[]>
 *   type="nextjs"
 *   urls={['/api/products/featured', '/api/products/new', '/api/products/sale']}
 *   waitForAll={2}
 * >
 *   {(data) => <ProductGrid products={data} />}
 * </DataLoader>
 *
 * @returns {React.JSX.Element} Rendered component with loading, error, or data states
 * @category Components
 */
export const DataLoader = <T,>({
  children,
  queryOptions,
  LoadingComponent = <Loader />,
  ErrorComponent = ClientError,
  waitForAll,
  ...props
}: DataLoaderProps<T>): React.ReactElement => {
  if (props.type === 'nextjs' && props.urls) {
    const { nextParams, urls, config } = props;
    const { data, error } = useSuspenseQuery<T[]>({
      queryKey: queryOptions?.queryKey ?? ['multiple-urls', urls, nextParams],
      queryFn: async (): Promise<T[]> => {
        // Fix: Removed redundant declaration
        const fetchRequests = urls?.map(async (url) => {
          const searchParams = nextParams
            ? `?${new URLSearchParams(nextParams as Record<string, string>)}`
            : '';
          const fullUrl = `${url}${searchParams}`;

          const res = await catchError(fetcher<FetchResponse<T>>, [
            fullUrl,
            config?.method,
            config,
          ]);

          if (res.success) {
            const { status, data, statusText } = res.value;
            if (!status.toString().startsWith('2')) {
              throw new Error(`${statusText} at DataLoader ${parseCodePath(fullUrl, fetcher)}`);
            }
            return data;
          }
          throw res.error;
        });

        // Use Promise.allSettled() to allow all requests to complete, even if some fail
        const results = await Promise.allSettled(fetchRequests ?? []);

        // Extract fulfilled values, handle rejections if needed
        return results.map((result) =>
          result.status === 'fulfilled' ? result.value : new Error('Request failed'),
        ) as T[];
      },
      ...queryOptions,
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 60 * 5,
    } as UseSuspenseQueryOptions<T[], Error, T[], QueryKey>);

    return (
      <Suspense fallback={LoadingComponent}>
        {error && renderError(ErrorComponent, error)}
        {children(data as T)}
      </Suspense>
    );
  }

  const { data, error } = useSuspenseQuery<T>({
    queryKey: queryOptions?.queryKey ?? [
      props.type === 'elysia' ? props.apiPath : props.url,
      props.type === 'elysia' ? props.elysiaParams : props.nextParams,
    ],
    queryFn: async (): Promise<T> => {
      if (props.type === 'elysia') {
        const { elysiaParams, apiPath } = props;

        const apiMethod = await elysia_api(
          apiPath,
          elysiaParams
        );

        if (typeof apiMethod === 'function') {
          const res = await catchError<[typeof elysiaParams], T>(
            apiMethod as (_: typeof elysiaParams) => Promise<T>,
            [elysiaParams],
          );
          if (res.success) return res.value;
          throw res.error;
        }
        throw new Error('Invalid API method');
      }

      const { url, nextParams, config } = props;
      const searchParams = nextParams
        ? `?${new URLSearchParams(nextParams as Record<string, string>)}`
        : '';
      const fullUrl = `${url}${searchParams}`;

      const res = await catchError(fetcher<FetchResponse<T>>, [
        fullUrl,
        config?.method,
        config,
      ]);

      if (res.success) {
        const { status, data, statusText } = res.value;
        if (!status.toString().startsWith('2')) {
          throw new Error(`${statusText} at DataLoader ${parseCodePath(fullUrl, fetcher)}`);
        }
        return data;
      }
      throw res.error;
    },
    ...queryOptions,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  } as UseSuspenseQueryOptions<T, Error, T, QueryKey>);

  return (
    <Suspense fallback={LoadingComponent}>
      {error && renderError(ErrorComponent, error)}
      {children(data as T)}
    </Suspense>
  );
};

DataLoader.displayName = 'DataLoader';
export default DataLoader;

/**
 * Helper function to render error components consistently.
 * Handles both React elements and component types for error display.
 *
 * @param {React.ComponentType<{ error: Error }> | React.ReactElement} ErrorComponent - Component to render the error
 * @param {Error} error - Error object to display
 * @returns {React.ReactElement} Rendered error component
 * @private
 */
const renderError = (
  ErrorComponent: React.ComponentType<{ error: Error }> | React.ReactElement,
  error: Error,
): React.ReactElement => {
  if (React.isValidElement(ErrorComponent)) {
    return React.cloneElement(ErrorComponent as React.ReactElement<{ error: Error }>, {
      error,
    });
  }
  const Component = ErrorComponent as React.ComponentType<{ error: Error }>;
  return <Component error={error} />;
};
