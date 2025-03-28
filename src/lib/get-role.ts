import { bind, logger, map, railway, success, tap } from '@/utils';
import { db } from './prisma';

/**
 * Retrieves the role of a user by their user ID
 *
 * @param {Object} params - The parameters object
 * @param {string} params.userId - The ID of the user to get the role for
 * @returns {Promise<$Enums.Role | undefined>} The user's role or undefined if not found
 */
export const getRole = async ({ userId }: { userId: string }) => {
  const role = async () =>
    await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true
      }
    }).withAccelerateInfo();

  return railway(
    undefined,
    () => success(role()),
    bind((result: ReturnType<typeof role>) => success(result.then((res) => res?.data?.role))),
    map((data: Awaited<ReturnType<typeof role>>) => data?.data?.role),
    tap((role) => {
      if (role) {
        logger.info('Role fetched successfully', { userId, role });
      } else {
        logger.warn('No role found for user', { userId });
      }
    })
  ).success
    ? logger.info('Role fetched successfully', { userId })
    : ((err: unknown) => {
        if (err instanceof Error) {
          logger.error('Role fetch failed', { userId, error: err.message });
        } else {
          logger.error('Role fetch failed', { userId, error: String(err) });
        }
        return undefined;
      })(Error('Failed to fetch role'));
};
