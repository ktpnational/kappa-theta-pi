'use server';
import { elysia_server_api } from '@/providers/core/server/server';
import { parseCodePath } from '@/utils';
import type { $Enums } from '@prisma/client';

/**
 * Retrieves the role of a user by their user ID
 *
 * @param {Object} params - The parameters object
 * @param {string} params.userId - The ID of the user to get the role for
 * @returns {Promise<$Enums.Role | undefined>} The user's role or undefined if not found
 */
export const getRole = async (): Promise<$Enums.Role> => {
  try {
    const res = await elysia_server_api.api.v1['get-role'].get()

    if (res.error || !res.data) {
      parseCodePath(res, getRole)
      throw new Error(res.error?.message || 'Failed to get role')
    }
    return res.data as $Enums.Role
  } catch (err) {
    throw new Error(parseCodePath(`${err instanceof Error ? err.message : 'Failed to get role'}`, getRole))
  }
};
