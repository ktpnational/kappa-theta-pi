import { env } from '@/env';
import { PrismaClient } from '@prisma/client';
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
  return new PrismaClient(options[nodeEnv]);
};

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;