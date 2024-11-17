'use server';

import type * as z from 'zod';

import { getUserByEmail } from '@/data';
import { generatePasswordResetToken, sendPasswordResetEmail } from '@/lib';
import { ResetSchema } from '@/schemas';

/**
 * Server action that handles password reset request initiation
 *
 * @description
 * This server action processes password reset requests by:
 * 1. Validating the provided email address
 * 2. Verifying user existence in the system
 * 3. Generating a secure reset token
 * 4. Sending reset instructions via email
 *
 * The function implements a secure process for password reset requests:
 * - Validates email format using Zod schema
 * - Checks if the email belongs to a registered user
 * - Generates a time-limited reset token
 * - Sends an email with reset instructions and token
 *
 * Security measures:
 * - Server-side only execution
 * - Email validation before processing
 * - User existence verification
 * - Secure token generation
 * - Limited token validity period
 *
 * @param {z.infer<typeof ResetSchema>} values - Form values containing:
 *   - email: User's registered email address
 *
 * @returns {Promise<{
 *   error?: string;
 *   success?: string;
 * }>} Returns an object containing either:
 * - error: Description of what went wrong (invalid email or user not found)
 * - success: Confirmation that reset email was sent
 *
 * @throws
 * May throw errors from:
 * - Email validation
 * - Database operations
 * - Token generation
 * - Email sending
 *
 * @example
 * ```typescript
 * // Basic password reset request
 * const result = await reset({
 *   email: "user@example.com"
 * });
 *
 * // Error handling
 * try {
 *   const result = await reset(formValues);
 *   if (result.error) {
 *     // Handle specific error cases
 *     console.error(result.error);
 *   } else {
 *     // Reset email sent successfully
 *     console.log(result.success);
 *   }
 * } catch (error) {
 *   // Handle unexpected errors
 *   console.error('Password reset request failed:', error);
 * }
 * ```
 *
 * @see {@link generatePasswordResetToken} For token generation details
 * @see {@link sendPasswordResetEmail} For email sending implementation
 */
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: 'Reset email sent!' };
};
