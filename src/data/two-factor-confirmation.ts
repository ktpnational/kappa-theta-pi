import { db } from '@/lib/prisma';

/**
 * Retrieves a two-factor confirmation record for a specific user from the database.
 *
 * @param {string} userId - The unique identifier of the user whose 2FA confirmation should be retrieved
 *
 * @returns {Promise<TwoFactorConfirmation | null>} Returns a Promise that resolves to either:
 *   - The TwoFactorConfirmation object if found
 *   - null if no confirmation exists or if there was an error during retrieval
 *
 * @description
 * This function attempts to find a unique two-factor confirmation record in the database
 * based on the provided userId. It uses Prisma's findUnique operation to query the
 * twoFactorConfirmation table.
 *
 * @example
 * ```typescript
 * const confirmation = await getTwoFactorConfirmationByUserId("user123");
 * if (confirmation) {
 *   // Handle existing confirmation
 * } else {
 *   // Handle no confirmation found
 * }
 * ```
 *
 * @throws {PrismaClientKnownRequestError} Caught internally - returns null on database errors
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};
