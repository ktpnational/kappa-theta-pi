/**
 * @fileoverview Prisma database client configuration and initialization
 * @module lib/prisma
 * @description This module provides a singleton instance of the Prisma client
 * for database operations throughout the application. It implements the singleton
 * pattern to prevent multiple client instances and includes Prisma Accelerate
 * for improved performance.
 */

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

/**
 * Creates a new Prisma client instance with appropriate logging configuration
 * and Prisma Accelerate extension.
 *
 * @function prismaClientSingleton
 * @returns {PrismaClient} A configured Prisma client instance
 * @private
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    errorFormat: 'pretty',
    log: process.env.NODE_ENV === 'production'
      ? ['error'] // Only log errors in production
      : ['query', 'error', 'warn'], // Log queries, errors, and warnings in development
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
      isolationLevel: 'Serializable',
    },
  }).$extends(withAccelerate()); // Apply Prisma Accelerate for improved performance
}

/**
 * Extends the global namespace to include prisma client type
 * This allows for global singleton pattern implementation to prevent
 * multiple database connections during hot reloads in development.
 *
 * @typedef {Object} GlobalWithPrisma
 * @property {ReturnType<typeof prismaClientSingleton>} prisma - The Prisma client instance
 */
declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>
} & typeof global;

/**
 * Initialize the Prisma client with singleton pattern implementation.
 * This prevents creating multiple connections during development hot reloads.
 *
 * @private
 */
let prisma = globalThis.prisma ?? prismaClientSingleton();

/**
 * Handle different environment configurations:
 * - In production: Always create a new client instance
 * - In development: Reuse the existing client from globalThis if available
 */
if (process.env.NODE_ENV === 'production') {
  // In production, always create a new client to ensure clean state
  prisma = prismaClientSingleton();
} else {
  // In development, implement singleton pattern to prevent multiple connections
  if (!globalThis.prisma) {
    globalThis.prisma = prismaClientSingleton();
  }
  prisma = globalThis.prisma;
}

/**
 * Database client singleton instance exposed for use throughout the application.
 *
 * @constant db
 * @type {PrismaClient}
 * @public
 *
 * @remarks
 * Uses global singleton pattern to prevent multiple client instances:
 * - Reuses existing global client if available in development
 * - Creates new client if none exists or in production environment
 * - Includes Prisma Accelerate for improved query performance
 * - Configures appropriate logging based on environment
 *
 * @example
 * // Import the database client
 * import { db } from '@/lib/prisma'
 *
 * // Use in async function
 * async function getUser(id: string) {
 *   return await db.user.findUnique({
 *     where: { id }
 *   });
 * }
 *
 * @example
 * // Use with related models
 * const userWithProfile = await db.user.findUnique({
 *   where: { id: userId },
 *   include: { profile: true }
 * });
 */
export const db = prisma;

/**
 * Re-export PrismaClient type for use in other modules
 * This allows other modules to use the PrismaClient type without
 * directly importing from @prisma/client
 */
export type { PrismaClient };
