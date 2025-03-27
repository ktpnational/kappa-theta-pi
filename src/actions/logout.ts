'use server';

import { signOut } from '@/lib/auth-client';

/**
 * Server action that handles user logout functionality
 *
 * @description
 * This is a protected server action that signs out the currently authenticated user.
 * It uses the `signOut()` function from NextAuth to terminate the user's session
 * and clear authentication tokens.
 *
 * @remarks
 * The function is marked with 'use server' directive to ensure it only runs
 * on the server side. This provides security by preventing client-side
 * manipulation of the logout process.
 *
 * The logout process:
 * 1. Terminates the current session
 * 2. Clears authentication cookies
 * 3. Removes user credentials from server memory
 *
 * @returns {Promise<void>}
 * Returns a promise that resolves when the logout process completes
 *
 * @throws
 * May throw errors from the underlying signOut() function if the logout
 * process fails
 *
 * @example
 * ```typescript
 * // Basic usage
 * await logout();
 *
 * // Usage with error handling
 * try {
 *   await logout();
 *   // Handle successful logout
 * } catch (error) {
 *   // Handle logout failure
 *   console.error('Logout failed:', error);
 * }
 * ```
 */
export const logout = async () => {
  await signOut();
};
