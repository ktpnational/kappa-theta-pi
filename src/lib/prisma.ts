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

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient({
    log: ['error'],
  });
} else {
  if (!globalForPrisma.cachedPrisma) {
    globalForPrisma.cachedPrisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  db = globalForPrisma.cachedPrisma;
}

export { db };
