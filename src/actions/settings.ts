'use server';

import bcrypt from 'bcryptjs';
import type * as z from 'zod';

import { getUserByEmail, getUserById } from '@/data';
import { currentUser, db, generateVerificationToken, sendVerificationEmail } from '@/lib';
import type { SettingsSchema } from '@/schemas';

/**
 * Updates user settings based on provided values
 *
 * @param values - Object containing user settings to update, validated against SettingsSchema
 * @param values.email - New email address (optional)
 * @param values.password - Current password for verification (optional)
 * @param values.newPassword - New password to set (optional)
 * @param values.isTwoFactorEnabled - Whether to enable 2FA (optional)
 *
 * @returns Promise resolving to either:
 * - {success: string} - Success message if update completed
 * - {error: string} - Error message if update failed
 *
 * @throws Will throw if database operations fail
 *
 * @description
 * This server action handles updating user settings with the following logic:
 *
 * 1. Validates user is authenticated
 * 2. For OAuth users:
 *    - Prevents email/password/2FA changes
 * 3. For email changes:
 *    - Verifies new email isn't in use
 *    - Sends verification email
 *    - Returns early with success message
 * 4. For password changes:
 *    - Verifies current password
 *    - Hashes new password
 * 5. Updates user record with new values
 *
 * Security measures:
 * - Requires authentication
 * - Verifies email ownership
 * - Hashes passwords
 * - Prevents OAuth account modification
 */
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized!' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized!' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Verification email sent!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings Updated!' };
};
