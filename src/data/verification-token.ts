'use server';

// import { db } from '@/lib/prisma';

/**
 * Retrieves a verification token from the database by email address
 *
 * @param email - The email address associated with the verification token to find
 * @returns {Promise<VerificationToken | null>} The verification token if found, null if not found or on error
 *
 * @throws Will return null instead of throwing if database query fails
 *
 * @example
 * const token = await getVerificationTokenByEmail("user@example.com");
 * if (token) {
 *   // Token found
 * }
 */
// @ts-ignore
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    // const verificationToken = await db.verificationToken.findFirst({
    //   where: { email },
    // });

    // return verificationToken;
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a verification token from the database by token string
 *
 * @param token - The unique token string to search for
 * @returns {Promise<VerificationToken | null>} The verification token if found, null if not found or on error
 *
 * @throws Will return null instead of throwing if database query fails
 *
 * @example
 * const token = await getVerificationTokenByToken("abc123");
 * if (token) {
 *   // Token found
 * }
 */
// @ts-ignore
export const getVerificationTokenByToken = async (token: string) => {
  try {
    // const verificationToken = await db.verificationToken.findUnique({
    //   where: { token },
    // });

    // return verificationToken;
    return null;
  } catch (error) {
    return null;
  }
};
