'use server';
import type { $Enums } from '@prisma/client';
import { unauthorized } from 'next/navigation';
import { db } from './prisma';

/**
 * Retrieves the role of a user by their user ID
 *
 * @param {Object} params - The parameters object
 * @param {string} params.userId - The ID of the user to get the role for
 * @returns {Promise<$Enums.Role | undefined>} The user's role or undefined if not found
 */
export const getRole = async ({ userId }: { userId: string }): Promise<$Enums.Role> => {
  const role = async () =>
    await db.user
      .findUnique({
        where: {
          id: userId,
        },
        select: {
          role: true,
        },
      })
      .withAccelerateInfo();

  const { data }  = await role()

  if (!data) {
    throw unauthorized()
  }
  return data.role
};
