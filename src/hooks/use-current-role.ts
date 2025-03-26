'use client';

// TODO: NEXT_AUTH

/**
 * Custom hook to retrieve the current user's role from the active session.
 *
 * This hook utilizes next-auth's useSession hook to access session data
 * and extract the user's role information.
 *
 * @returns {string | undefined} The user's role if available in the session,
 *                              undefined if no session exists or role is not set
 *
 * @example
 * // Inside a component:
 * const userRole = useCurrentRole();
 * if (userRole === 'admin') {
 *   // Handle admin-specific logic
 * }
 *
 * @see {@link https://next-auth.js.org/getting-started/client#usesession Next-auth useSession documentation}
 */
export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user.role;
};
