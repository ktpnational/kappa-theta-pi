/**
 * Retrieves an account from the database by user ID.
 *
 * @async
 * @param {string} userId - The unique identifier of the user whose account should be retrieved
 * @returns {Promise<Account|null>} A Promise that resolves to either:
 *   - The account object if found
 *   - null if no account exists for the user ID or if an error occurs
 * @throws {Error} Database errors are caught and handled internally
 *
 * @example
 * try {
 *   const account = await getAccountByUserId('123');
 *   if (account) {
 *     console.log('Found account:', account);
 *   } else {
 *     console.log('No account found');
 *   }
 * } catch (error) {
 *   console.error('Error:', error);
 * }
 */
import { db } from '@/lib/prisma';

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch (error) {
    return null;
  }
};
