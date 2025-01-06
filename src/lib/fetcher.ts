import { catchError, getURL } from '@/utils/helpers/helpers';
import axios, { type AxiosRequestConfig, AxiosError, type Method } from 'axios';

/**
 * Configuration options for enhanced fetching that extends the base Axios request config
 *
 * @interface FetcherOptions
 * @extends {AxiosRequestConfig}
 * @property {number} [retries=0] - Number of retry attempts in case of failure. Defaults to 0 (no retries)
 * @property {number} [retryDelay=1000] - Base delay between retry attempts in milliseconds. Actual delay increases exponentially with each retry
 * @property {(error: AxiosError) => void} [onError] - Optional callback for custom error handling. Called before throwing on final retry
 * @property {number} [timeout=10000] - Request timeout in milliseconds. Defaults to 10 seconds
 *
 * @example
 * ```ts
 * const options: FetcherOptions = {
 *   retries: 3,
 *   retryDelay: 2000,
 *   onError: (error) => console.error(error),
 *   timeout: 5000
 * };
 * ```
 */
export interface FetcherOptions extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
  onError?: (error: AxiosError) => void;
  timeout?: number;
}

/**
 * Custom error class for handling fetcher-specific errors with additional context
 *
 * @class FetcherError
 * @extends {Error}
 * @property {string} url - The URL that was being fetched when the error occurred
 * @property {number} [status] - HTTP status code of the failed response, if available
 * @property {unknown} [responseData] - Response data from the failed request, if available
 * @property {number} [attempt] - The retry attempt number when the error occurred
 *
 * @example
 * ```ts
 * throw new FetcherError(
 *   'Request failed',
 *   'https://api.example.com/data',
 *   404,
 *   { message: 'Not found' },
 *   2
 * );
 * ```
 */
export class FetcherError extends Error {
  constructor(
    message: string,
    public readonly url: string,
    public readonly status?: number,
    public readonly responseData?: unknown,
    public readonly attempt?: number,
  ) {
    super(message);
    this.name = 'FetcherError';
    Object.setPrototypeOf(this, FetcherError.prototype);
  }

  toString(): string {
    return `FetcherError: ${this.message} (URL: ${this.url}${this.status ? `, Status: ${this.status}` : ''}${this.attempt ? `, Attempt: ${this.attempt}` : ''})`;
  }
}

/**
 * Enhanced data fetching utility that provides advanced error handling, retry mechanism, and type safety.
 * Built on top of Axios with additional features for robust API interactions.
 *
 * @template T - The expected type of the successful response data
 * @template E - The expected type of the error response data
 *
 * @param {string} input - The URL or endpoint to fetch from
 * @param {FetcherOptions} [options={}] - Configuration options for the request
 * @returns {Promise<T>} A promise that resolves to the response data
 *
 * @throws {FetcherError}
 * - When max retries are exceeded
 * - When an Axios error occurs
 * - When an unexpected error occurs
 *
 * @example
 * ```ts
 * interface UserData {
 *   id: number;
 *   name: string;
 * }
 *
 * interface ErrorResponse {
 *   message: string;
 * }
 *
 * try {
 *   const userData = await fetcher<UserData, ErrorResponse>('/api/user', {
 *     retries: 3,
 *     retryDelay: 1000,
 *     timeout: 5000
 *   });
 *   console.log(userData.name);
 * } catch (error) {
 *   if (error instanceof FetcherError) {
 *     console.error(`Failed to fetch: ${error.message}`);
 *   }
 * }
 * ```
 *
 * @remarks
 * - Implements exponential backoff for retries
 * - Provides detailed error context through FetcherError
 * - Supports custom error handling through onError callback
 * - Preserves type safety throughout the request lifecycle
 * - Integrates with Axios interceptors for request/response processing
 */
export async function fetcher<T, E = unknown>(
  input: string,
  method: Uppercase<Method> = 'GET',
  options: Omit<FetcherOptions, 'method'> = {},
  params?: Record<string, string>,
): Promise<T> {
  const { retries = 0, retryDelay = 1000, onError, timeout = 10000, ...axiosConfig } = options;

  const instance = axios.create({
    timeout,
    ...axiosConfig,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  try {
    let attempt = 0;
    while (attempt <= retries) {
      const path = getURL(input);
      const result = await catchError(
        async (requestConfig: any) => {
          if (method === 'GET') {
            return instance.get<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, requestConfig);
          } else if (method === 'DELETE') {
            return instance.delete<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, requestConfig);
          } else if (method === 'HEAD') {
            return instance.head<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, requestConfig);
          } else if (method === 'OPTIONS') {
            return instance.options<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, requestConfig);
          } else if (method === 'POST') {
            return instance.post<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, null, requestConfig);
          } else if (method === 'PUT') {
            return instance.put<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, null, requestConfig);
          } else if (method === 'PATCH') {
            return instance.patch<T>(params ? `${path}?${buildQueryString(params)}` : `${path}`, null, requestConfig);
          }
          throw new Error(`Unsupported HTTP method: ${method}`);
        },
        axiosConfig
      );

      if (result.success) {
        return result.value.data;
      }

      if (attempt === retries) {
        if (onError && result.error instanceof AxiosError) onError(result.error);
        throw new FetcherError(
          result.error.message,
          path,
          result.error instanceof AxiosError ? result.error.response?.status : undefined,
          result.error instanceof AxiosError ? result.error.response?.data : undefined,
          attempt,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
      attempt++;
    }

    throw new FetcherError(`Max retries exceeded`, input, undefined, undefined, retries);
  } catch (error) {
    if (error instanceof FetcherError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<E>;
      throw new FetcherError(
        axiosError.message,
        input,
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
    throw new FetcherError(error instanceof Error ? error.message : 'Unknown error', input);
  }
}

const buildQueryString = (params: Record<string, any>): string => {
  if (!params) return '';

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.filter((item) => item != null).forEach((item) => urlParams.append(key, String(item)));
    } else {
      urlParams.append(key, String(value));
    }
  });

  return urlParams.toString();
};
