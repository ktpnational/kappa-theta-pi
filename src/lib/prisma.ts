import { env } from '@/env';
import { logger } from '@/utils';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

if (typeof window !== 'undefined') {
  throw new Error('PrismaClient cannot be used in browser environment');
}

const log = logger.getSubLogger({ prefix: ['Prisma'] });

const options: Record<string, Prisma.PrismaClientOptions> = {
  development: {
    datasourceUrl: env.DATABASE_URL,
    errorFormat: 'pretty' as const,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ] as const,
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
    },
  },
  production: {
    datasourceUrl: env.DATABASE_URL,
    errorFormat: 'minimal' as const,
    log: [{ emit: 'event', level: 'error' }] as const,
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
    },
  },
  test: {
    datasourceUrl: env.DATABASE_URL,
    errorFormat: 'pretty' as const,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ] as const,
    transactionOptions: {
      maxWait: 10000,
      timeout: 10000,
    },
  },
};

/**
 * Creates a new PrismaClient instance with appropriate options
 */
const createPrismaClient = () => {
  const nodeEnv = (env.NODE_ENV || 'development') as keyof typeof options;
  log.info(`Creating PrismaClient with ${nodeEnv} configuration`);

  const prisma = new PrismaClient(options[nodeEnv]);

  prisma.$on('query' as never, (e: Prisma.QueryEvent) => {
    log.debug('Query', { query: e.query, params: e.params, duration: `${e.duration}ms` });
  });

  prisma.$on('error' as never, (e: Prisma.LogEvent) => {
    log.error('Database error', { message: e.message, target: e.target });
  });

  prisma.$on('warn' as never, (e: Prisma.LogEvent) => {
    log.warn('Database warning', { message: e.message, target: e.target });
  });

  return prisma;
};

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  log.info('Setting Prisma client in global scope for development');
  globalForPrisma.prisma = db;
}
