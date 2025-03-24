/**
 * @fileoverview Prisma database client configuration and initialization
 * @module lib/prisma
 */

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate())
}

/**
 * Extends the global namespace to include prisma client type
 * This allows for global singleton pattern implementation
 */
declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>
} & typeof global

let prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = prismaClientSingleton()
  }
  prisma = globalThis.prisma;
}

/**
 * Database client singleton instance
 *
 * @constant
 * @type {PrismaClient}
 *
 * @remarks
 * Uses global singleton pattern to prevent multiple client instances:
 * - Reuses existing global client if available
 * - Creates new client if none exists
 *
 * @example
 * import { db } from '@/lib/prisma'
 *
 * // Use db for database operations
 * const user = await db.user.findUnique({
 *   where: { id: 1 }
 * })
 */
export const db = prisma;

/**
 * Re-export PrismaClient type for use in other modules
 */
export type { PrismaClient };
