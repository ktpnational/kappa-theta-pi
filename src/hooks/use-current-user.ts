'use client';

import { useSession } from '@/lib/auth-client';



/**
 * Custom React hook that retrieves the currently authenticated user.
 *
 * This hook wraps <>'s useSession hook to provide direct access to the user object
 * from the session data. It safely handles cases where the session or user may be undefined.
 *
 * @returns {object|undefined} The current user object if authenticated, undefined otherwise.
 * The user object typically contains properties like:
 * - id: The unique identifier for the user
 * - email: The user's email address
 * - name: The user's full name
 * - image: URL to the user's profile image
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const user = useCurrentUser();
 *
 *   if (!user) {
 *     return <div>Not logged in</div>;
 *   }
 *
 *   return <div>Welcome {user.name}!</div>;
 * }
 * ```
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
