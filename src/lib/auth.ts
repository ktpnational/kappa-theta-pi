import { auth } from '@/auth';
import { headers } from 'next/headers';

/**
 * Retrieves the current authenticated user from the session
 *
 * @async
 * @function currentUser
 * @returns {Promise<User|undefined>} A promise that resolves to the current user object if authenticated,
 * or undefined if no active session exists
 *
 * @example
 * const user = await currentUser();
 * if (user) {
 *   console.log(user.name); // Access user properties
 * }
 */
export const currentUser = async () => {
  "use server"
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return session?.user;
};

/**
 * Gets the role of the currently authenticated user
 *
 * @async
 * @function currentRole
 * @returns {Promise<string|undefined>} A promise that resolves to the user's role if authenticated,
 * or undefined if no active session exists or user has no role assigned
 *
 * @example
 * const role = await currentRole();
 * if (role === 'admin') {
 *   // Perform admin-only operations
 * }
 */
export const currentRole = async () => {
  "use server"
  const session = await auth.api.getSession({ headers: await headers() });

  // TODO: use Prisma to get role
  return session?.user?.id;
};
