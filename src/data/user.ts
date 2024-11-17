import { db } from '@/lib';

/**
 * Retrieves a user from the database by their email address
 * 
 * @param {string} email - The email address to search for
 * @returns {Promise<User|null>} Promise that resolves to the User object if found, null otherwise
 * 
 * @throws Will return null if database query fails
 * 
 * @example
 * ```typescript
 * const user = await getUserByEmail('user@example.com');
 * if (user) {
 *   console.log(user.name);
 * }
 * ```
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a user from the database by their unique ID
 * 
 * @param {string} id - The unique identifier of the user
 * @returns {Promise<User|null>} Promise that resolves to the User object if found, null otherwise
 * 
 * @throws Will return null if database query fails
 * 
 * @example
 * ```typescript
 * const user = await getUserById('123e4567-e89b-12d3-a456-426614174000');
 * if (user) {
 *   console.log(user.name); 
 * }
 * ```
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};
