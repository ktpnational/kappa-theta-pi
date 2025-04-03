'use server';

import { db } from '@/lib/prisma';

/**
 * Retrieves a password reset token record from the database by its token value
 *
 * @param {string} token - The unique token string to search for
 * @returns {Promise<PasswordResetToken | null>} The password reset token record if found, null if not found or on error
 *
 * @throws {PrismaClientKnownRequestError} If there is a known Prisma Client request error
 * @throws {PrismaClientUnknownRequestError} If there is an unknown Prisma Client request error
 *
 * @example
 * ```typescript
 * const token = await getPasswordResetTokenByToken("abc123");
 * if (token) {
 *   // Token found
 *   console.log(token.email);
 * }
 * ```
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a password reset token record from the database by email address
 *
 * @param {string} email - The email address to search for
 * @returns {Promise<PasswordResetToken | null>} The password reset token record if found, null if not found or on error
 *
 * @throws {PrismaClientKnownRequestError} If there is a known Prisma Client request error
 * @throws {PrismaClientUnknownRequestError} If there is an unknown Prisma Client request error
 *
 * @example
 * ```typescript
 * const token = await getPasswordResetTokenByEmail("user@example.com");
 * if (token) {
 *   // Token found
 *   console.log(token.createdAt);
 * }
 * ```
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
