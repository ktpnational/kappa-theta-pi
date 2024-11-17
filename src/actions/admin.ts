'use server';

import { currentRole } from '@/lib';
import { Role } from '@prisma/client';

/**
 * Server action that checks if the current user has admin privileges
 *
 * @description
 * This is a protected server action that verifies the current user's role.
 * It uses the `currentRole()` function to fetch the authenticated user's role
 * and checks if they have ADMIN privileges.
 *
 * @remarks
 * The function is marked with 'use server' directive to ensure it only runs
 * on the server side. This provides an additional layer of security by preventing
 * client-side execution of role checks.
 *
 * @returns {Promise<{success: string} | {error: string}>}
 * Returns an object with either:
 * - `{success: string}` if the user has admin privileges
 * - `{error: string}` if the user lacks admin privileges
 *
 * @throws
 * May throw errors from the underlying currentRole() function if role
 * verification fails
 *
 * @example
 * ```typescript
 * const result = await admin();
 * if ('error' in result) {
 *   // Handle unauthorized access
 *   console.error(result.error);
 * } else {
 *   // Proceed with admin action
 *   console.log(result.success);
 * }
 * ```
 */
export const admin = async () => {
  const role = await currentRole();

  if (role === Role.ADMIN) {
    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
