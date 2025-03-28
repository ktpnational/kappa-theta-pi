import { bind, logger, map, railway, success, tap } from '@/utils';
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

  const result = railway(
    'GUEST',
    () => success(role()),
    bind((result: ReturnType<typeof role>) => success(result.then((res) => res?.data?.role))),
    map((data: Awaited<ReturnType<typeof role>>) => data?.data?.role),
    tap((role) => {
      if (role) {
        logger.info('Role fetched successfully', { userId, role });
      } else {
        logger.warn('No role found for user', { userId });
      }
    }),
  );

  if (!result.success) {
    logger.error('Role fetch failed', { userId, error: 'Failed to fetch role' });
    throw unauthorized();
  }

  return result.value as $Enums.Role;
};
