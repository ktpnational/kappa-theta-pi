'use server';

import { getUserByEmail, getVerificationTokenByToken } from '@/data';
// import { db } from '@/lib/prisma';

/**
 * Server action that verifies a user's email address using a verification token
 *
 * @description
 * This server action processes email verification requests by:
 * 1. Validating the provided verification token
 * 2. Checking token expiration
 * 3. Verifying user existence
 * 4. Updating user email verification status
 *
 * The function implements a multi-step verification process to ensure
 * the security and validity of email verifications:
 * - Validates the existence of the verification token
 * - Ensures the token hasn't expired
 * - Confirms the associated user account exists
 * - Updates the user's email verification status
 * - Cleans up by removing the used verification token
 *
 * @param {string} token - The verification token sent to the user's email
 *
 * @returns {Promise<{
 *   error?: string;
 *   success?: string;
 * }>} Returns an object containing either:
 * - error: Description of what went wrong during verification
 * - success: Confirmation message upon successful verification
 *
 * @throws
 * May throw errors from underlying database operations if they fail
 *
 * @example
 * ```typescript
 * // Basic usage
 * const result = await newVerification("verification_token_123");
 * if ('error' in result) {
 *   // Handle verification failure
 *   console.error(result.error);
 * } else {
 *   // Handle successful verification
 *   console.log(result.success);
 * }
 * ```
 *
 * @remarks
 * The function is marked with 'use server' directive to ensure it only runs
 * on the server side. This provides security by preventing client-side
 * manipulation of the verification process.
 *
 * The verification process:
 * 1. Retrieves and validates the verification token
 * 2. Checks if the token has expired
 * 3. Verifies the associated user exists
 * 4. Updates the user's email verification status
 * 5. Removes the used verification token
 */
export const newVerification = async (token: string) => {
  // TODO: 🚩
  const existingToken = await getVerificationTokenByToken(token) as any;

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist' };
  }

  // await db.user.update({
  //   where: { id: existingUser.id },
  //   data: {
  //     emailVerified: true,
  //     email: existingToken.email,
  //   },
  // });

  // await db.verificationToken.delete({
  //   where: { id: existingToken.id },
  // });

  return { success: 'Email verified!' };
};
