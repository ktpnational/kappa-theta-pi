'use client';

import { hono_api } from '@/providers/core/server/react';
import { catchError } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 

/**
 * Configuration options for RPC mutation hook
 * @template TRoute - Route key from Hono API definition
 * @typedef {Object} MutationOptions
 * @property {TRoute} route - API route path to call
 * @property {keyof (typeof hono_api)[TRoute]} method - HTTP method to use (GET, POST, etc)
 * @property {string} [successMessage="Operation successful"] - Toast message to show on success
 * @property {string} [errorMessage="Operation failed"] - Toast message to show on error
 * @property {(data: any) => void} [onSuccessCallback] - Optional callback to run after successful mutation
 * @property {string[]} [invalidateQueries=[]] - Query keys to invalidate after successful mutation
 */
type MutationOptions<TRoute extends keyof typeof hono_api> = {
  route: TRoute;
  method: keyof (typeof hono_api)[TRoute];
  successMessage?: string;
  errorMessage?: string;
  onSuccessCallback?: (data: any) => void;
  invalidateQueries?: string[];
};

/**
 * Custom hook for making RPC-style mutations using Hono API endpoints
 *
 * This hook provides a standardized way to make mutations with:
 * - Strongly typed request/response handling
 * - Automatic toast notifications
 * - Query invalidation
 * - Route refresh
 * - Success callback support
 *
 * @template TRoute - Route key from Hono API definition
 * @param {MutationOptions<TRoute>} options - Configuration options for the mutation
 * @param {TRoute} options.route - API route path to call
 * @param {keyof (typeof hono_api)[TRoute]} options.method - HTTP method to use
 * @param {string} [options.successMessage="Operation successful"] - Success toast message
 * @param {string} [options.errorMessage="Operation failed"] - Error toast message
 * @param {(data: any) => void} [options.onSuccessCallback] - Optional success callback
 * @param {string[]} [options.invalidateQueries=[]] - Query keys to invalidate
 *
 * @returns {UseMutationResult} Mutation result object from react-query
 *
 * @example
 * ```tsx
 * const mutation = useRpcMutation({
 *   route: 'users',
 *   method: '$post',
 *   successMessage: 'User created successfully',
 *   invalidateQueries: ['users']
 * });
 *
 * // Use the mutation
 * mutation.mutate({
 *   json: { name: 'John', email: 'john@example.com' }
 * });
 * ```
 */
export const useRpcMutation = <TRoute extends keyof typeof hono_api.api>({
  route,
  method,
  successMessage = 'Operation successful',
  errorMessage = 'Operation failed',
  onSuccessCallback,
  invalidateQueries = [],
}: MutationOptions<TRoute>) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  type ResponseType = InferResponseType<
    (typeof hono_api.api)[TRoute][keyof (typeof hono_api.api)[TRoute]]
  >;
  type RequestType = InferRequestType<
    (typeof hono_api.api)[TRoute][keyof (typeof hono_api.api)[TRoute]]
  >;

  const mutation = useMutation<ResponseType, Error, { json: RequestType }>({
    mutationFn: async ({ json }) => {
      // @ts-ignore - Dynamic route and method handling
      const [error, response] = await catchError(hono_api.api[route][method]({ json }));

      if (error) {
        errorMessage = error.message;
        toast.error(errorMessage);
        throw error;
      }

      return response as ResponseType;
    },
    onSuccess: (data) => {
      toast.success(successMessage);
      router.refresh();

      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      onSuccessCallback?.(data);
    },
    onError: () => {
      toast.error(errorMessage);
    },
  });

  return mutation;
};
