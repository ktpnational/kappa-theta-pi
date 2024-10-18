import { PrismaClient } from '@prisma/client';

/**
 * Creates a new instance of PrismaClient with logging configuration based on the environment.
 * @returns {PrismaClient} A new instance of PrismaClient.
 */
const createPrismaClient = (): PrismaClient =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
};

/**
 * The PrismaClient instance to be used for database operations.
 * If in development mode, it caches the instance globally to avoid creating multiple instances.
 */
export const db = globalForPrisma.cachedPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.cachedPrisma = db;
