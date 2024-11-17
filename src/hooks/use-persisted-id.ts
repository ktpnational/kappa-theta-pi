'use client';

import { randomUUID as uuidv4 } from 'crypto';
import { useQueryState } from 'nuqs';
import { useCallback } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

/**
 * Custom React hook for managing a persisted ID in both session storage and URL query parameters.
 * This hook provides functionality to store, retrieve, clear and generate unique identifiers that
 * persist across page refreshes while maintaining URL state synchronization.
 *
 * @param {string} key - The key used to store the ID in both session storage and URL query parameters.
 *                      This should be a unique string to avoid collisions with other stored values.
 *
 * @returns {Object} An object containing the following properties and methods:
 * @returns {string|null} id - The current persisted ID value, or null if no ID is set
 * @returns {Function} clearId - Removes the ID from both session storage and URL query parameters
 * @returns {Function} setPersistedId - Sets a new ID value in both storage locations
 * @returns {Function} generateNewId - Creates and persists a new UUID v4 identifier
 *
 * @example
 * ```tsx
 * const { id, clearId, setPersistedId, generateNewId } = usePersistedId('user-session');
 *
 * // Get current ID
 * console.log(id); // "550e8400-e29b-41d4-a716-446655440000" or null
 *
 * // Set a specific ID
 * setPersistedId("some-id");
 *
 * // Generate and set a new UUID
 * const newId = generateNewId();
 *
 * // Clear the ID
 * clearId();
 * ```
 *
 * @remarks
 * - The ID is stored in both sessionStorage and URL query parameters to maintain state
 * - Uses isomorphic layout effect to safely handle server-side rendering
 * - Automatically syncs between URL and session storage on initialization
 * - Safe to use in server-side rendering environments through window checks
 */
export const usePersistedId = (
  key: string,
): {
  id: string | null;
  clearId: () => void;
  setPersistedId: (newId: string) => void;
  generateNewId: () => string;
} => {
  const [id, setId] = useQueryState(key);

  const clearId = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
    setId(null);
  }, [key, setId]);

  const setPersistedId = useCallback(
    (newId: string) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, newId);
      }
      setId(newId);
    },
    [key, setId],
  );

  const generateNewId = useCallback(() => {
    const newId = uuidv4();
    setPersistedId(newId);
    return newId;
  }, [setPersistedId]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const existingId = sessionStorage.getItem(key);
      if (existingId && !id) {
        setId(existingId);
      }
    }
  }, [key, id, setId]);

  return { id: id ?? null, clearId, setPersistedId, generateNewId };
};
