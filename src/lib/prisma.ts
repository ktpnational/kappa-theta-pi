import { PrismaClient } from '@prisma/client';

/**
 * Creates a new instance of PrismaClient with logging configuration based on the environment.
 *
 * In development mode, the client will log queries, errors and warnings.
 * In production mode, only errors will be logged.
 *
 * @example
 * const prisma = createPrismaClient();
 *
 * // Development logging output:
 * // - Database queries
 * // - Error messages
 * // - Warning messages
 *
 * // Production logging output:
 * // - Only error messages
 *
 * @returns {PrismaClient} A configured PrismaClient instance
 */
const createPrismaClient = (): PrismaClient =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

/**
 * Type definition for the global PrismaClient cache.
 * Used to ensure type safety when accessing the global cache.
 *
 * @typedef {Object} GlobalPrismaType
 * @property {PrismaClient | undefined} cachedPrisma - The cached PrismaClient instance
 */
const globalForPrisma = globalThis as unknown as {
  cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
};

/**
 * A singleton instance of PrismaClient for database operations.
 *
 * This export provides a consistent database client throughout the application.
 * In development mode, the client instance is cached globally to prevent
 * creating multiple instances which could lead to performance issues and
 * exceeding database connection limits.
 *
 * The caching mechanism works as follows:
 * 1. First, checks if there's a cached instance in the global scope
 * 2. If no cached instance exists, creates a new one using createPrismaClient()
 * 3. In development, caches the instance globally for subsequent uses
 *
 * @example
 * import { db } from './path/to/this/file';
 *
 * // Use the client
 * const users = await db.user.findMany();
 *
 * @type {PrismaClient}
 */
export const db = globalForPrisma.cachedPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.cachedPrisma = db;
