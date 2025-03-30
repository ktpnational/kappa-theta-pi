import { env } from '@/env';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Prisma } from '@prisma/client';

if (typeof window !== 'undefined') {
  throw new Error('PrismaClient cannot be used in browser environment');
}

const options: Record<string, Prisma.PrismaClientOptions> = {
  development: {
    datasourceUrl: env.DATABASE_URL,
    errorFormat: 'pretty' as const,
    log: ['query', 'error', 'warn'] as const,
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
    },
  },
  production: {
    datasourceUrl: env.DATABASE_URL,
    errorFormat: 'minimal' as const,
    log: ['error'] as const,
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
    },
  },
  test: {
    datasourceUrl: env.DATABASE_URL,
    errorFormat: 'pretty' as const,
    log: ['query', 'error', 'warn'] as const,
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
    }
  }
};

/**
 * Creates a new PrismaClient instance with appropriate options
 */
const createPrismaClient = () => {
  const nodeEnv = (env.NODE_ENV || 'development') as keyof typeof options;
  return new PrismaClient(options[nodeEnv]).$extends(withAccelerate());
};

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

// Establish the singleton pattern properly
const prisma = global.prisma || createPrismaClient();

// Only set global.prisma in non-production environments to avoid memory leaks
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const db = prisma;