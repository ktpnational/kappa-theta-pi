'use server';

import bcrypt from 'bcryptjs';
import type * as z from 'zod';

import { getPasswordResetTokenByToken, getUserByEmail } from '@/data';
import { db } from '@/lib';
import { NewPasswordSchema } from '@/schemas';

/**
 * Server action that handles password reset functionality with token validation
 *
 * @description
 * This server action processes password reset requests by:
 * 1. Validating the provided reset token
 * 2. Checking token expiration
 * 3. Verifying user existence
 * 4. Securely updating the password
 *
 * The function implements a multi-step verification process to ensure
 * the security of password resets:
 * - Validates the presence and validity of the reset token
 * - Ensures the token hasn't expired
 * - Confirms the associated user account exists
 * - Safely updates the password with bcrypt hashing
 * - Cleans up by removing the used reset token
 *
 * @param {z.infer<typeof NewPasswordSchema>} values - Password reset form values containing:
 *   - password: New password to be set
 * @param {string | null} [token] - Password reset token received via email
 *
 * @returns {Promise<{
 *   error?: string;
 *   success?: string;
 * }>} Returns an object containing either:
 * - error: Description of what went wrong during the reset process
 * - success: Confirmation message upon successful password update
 *
 * @throws
 * May throw errors from:
 * - Database operations
 * - Password hashing
 * - Token validation
 *
 * @example
 * ```typescript
 * // Basic password reset
 * const result = await newPassword(
 *   { password: "newSecurePassword123" },
 *   "valid-reset-token"
 * );
 *
 * // Error handling
 * try {
 *   const result = await newPassword(formValues, resetToken);
 *   if (result.error) {
 *     // Handle specific error cases
 *     console.error(result.error);
 *   } else {
 *     // Password successfully updated
 *     console.log(result.success);
 *   }
 * } catch (error) {
 *   // Handle unexpected errors
 *   console.error('Password reset failed:', error);
 * }
 * ```
 */
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Password updated!' };
};
