"use server";
import { parseCodePath } from '@/utils';
import { logger } from '@/utils';
import type { $Enums } from '@prisma/client';
import { unauthorized } from 'next/navigation';
import { db } from './prisma';

const log = logger.getSubLogger({
  name: 'get-role',
});

/**
 * Retrieves the role of a user by their user ID
 *
 * @param {Object} params - The parameters object
 * @param {string} params.userId - The ID of the user to get the role for
 * @returns {Promise<$Enums.Role | undefined>} The user's role or undefined if not found
 */
export const getRole = async ({ userId }: { userId: string }): Promise<$Enums.Role> => {
  const role = await db.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    })
    .withAccelerateInfo()
    .then(({ data }) => {
      if (!data) {
        log.error(`${parseCodePath(``, getRole)}: User[${userId}] not found`);
        throw new Error(`${parseCodePath(``, getRole)}: User[${userId}] not found`);
      }
      if (!data.role) {
        unauthorized();
      }
      return data.role;
    })
    .catch((err) => {
      log.error('getRole', { err });
      throw new Error(
        `${parseCodePath(``, getRole)}: ${err instanceof Error ? err.message : err}`,
      );
    });
  return role;
};
