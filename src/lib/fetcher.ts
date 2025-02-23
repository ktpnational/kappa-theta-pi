import { catchError, getURL } from '@/utils/helpers/helpers';
import axios, { type AxiosRequestConfig, AxiosError, type Method } from 'axios';

/**
 * Configuration options for enhanced fetching that extends the base Axios request config
 */
export interface FetcherOptions extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
  onError?: (error: AxiosError) => void;
  timeout?: number;
}

/**
 * Custom error class for handling fetcher-specific errors with additional context
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
    (config) => config,
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  try {
    let attempt = 0;
    while (attempt <= retries) {
      const baseURL = getURL();
      const path = params ? `${baseURL}/${input}?${buildQueryString(params)}` : `${baseURL}/${input}`;

      const result = await catchError(async (requestConfig: any) => {
        switch (method) {
          case 'GET':
            return instance.get<T>(path, requestConfig);
          case 'DELETE':
            return instance.delete<T>(path, requestConfig);
          case 'HEAD':
            return instance.head<T>(path, requestConfig);
          case 'OPTIONS':
            return instance.options<T>(path, requestConfig);
          case 'POST':
            return instance.post<T>(path, null, requestConfig);
          case 'PUT':
            return instance.put<T>(path, null, requestConfig);
          case 'PATCH':
            return instance.patch<T>(path, null, requestConfig);
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
      }, axiosConfig);

      // ✅ FIX 1: Ensure `result.value` Exists Before Accessing `.data`
      if (result.success && result.value) {
        return result.value.data; // ✅ Safe Access
      }

      if (attempt === retries) {
        // ✅ FIX 2: Ensure `result.error` Exists Before Accessing `.message`
        if (result.error) {
          if (onError && result.error instanceof AxiosError) onError(result.error);
          throw new FetcherError(
            result.error.message ?? 'Unknown error',
            path,
            result.error instanceof AxiosError ? result.error.response?.status : undefined,
            result.error instanceof AxiosError ? result.error.response?.data : undefined,
            attempt,
          );
        }

        throw new FetcherError(`Unknown error occurred`, path, undefined, undefined, attempt);
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
