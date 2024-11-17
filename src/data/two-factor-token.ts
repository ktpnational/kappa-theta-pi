import { db } from '@/lib';

/**
 * Retrieves a two-factor authentication token record by its token value
 *
 * @param {string} token - The unique token string to search for
 * @returns {Promise<TwoFactorToken | null>} The matching two-factor token record if found, null otherwise
 *
 * @throws Will return null if database query fails
 *
 * @example
 * const token = await getTwoFactorTokenByToken("abc123");
 * if (token) {
 *   // Token found
 * } else {
 *   // Token not found
 * }
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a two-factor authentication token record by email address
 *
 * @param {string} email - The email address to search for
 * @returns {Promise<TwoFactorToken | null>} The first matching two-factor token record if found, null otherwise
 *
 * @throws Will return null if database query fails
 *
 * @description
 * This function finds the first token record matching the provided email address.
 * If multiple tokens exist for the same email, only the first one is returned.
 *
 * @example
 * const token = await getTwoFactorTokenByEmail("user@example.com");
 * if (token) {
 *   // Token found
 * } else {
 *   // No token exists for this email
 * }
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
