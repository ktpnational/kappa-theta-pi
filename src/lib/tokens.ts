import crypto from 'crypto';
import { randomUUID as uuidv4 } from 'crypto';

import { getPasswordResetTokenByEmail } from '@/data/password-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from '@/lib';

/**
 * Generates a new password reset token for a given email address
 *
 * @param email - The email address to generate the token for
 * @returns Promise resolving to the created password reset token object
 * @throws {Error} If there's a database error creating/deleting tokens
 *
 * @remarks
 * - Generates a UUID v4 token that expires in 1 hour (3600000ms)
 * - Deletes any existing password reset tokens for the email before creating new one
 * - Token is stored in database with email and expiration timestamp
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

/**
 * Generates a new email verification token for a given email address
 *
 * @param email - The email address to generate the verification token for
 * @returns Promise resolving to the created verification token object
 * @throws {Error} If there's a database error creating/deleting tokens
 *
 * @remarks
 * - Generates a UUID v4 token that expires in 1 hour (3600000ms)
 * - Deletes any existing verification tokens for the email before creating new one
 * - Token is stored in database with email and expiration timestamp
 */
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

/**
 * Generates a new two-factor authentication token for a given email address
 *
 * @param email - The email address to generate the 2FA token for
 * @returns Promise resolving to the created two-factor token object
 * @throws {Error} If there's a database error creating/deleting tokens
 *
 * @remarks
 * - Generates a 6-digit numeric token between 100,000 and 999,999
 * - Token expires in 5 minutes (300000ms)
 * - Deletes any existing two-factor tokens for the email before creating new one
 * - Token is stored in database with email and expiration timestamp
 */
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
