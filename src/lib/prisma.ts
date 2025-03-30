import { env } from '@/env';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
  var EdgeRuntime: string | undefined;
}

const isEdgeRuntime = typeof globalThis.EdgeRuntime === 'string';
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  throw new Error('PrismaClient cannot be used in browser environment');
}

const prismaClientSingleton = () => {
  if (!isEdgeRuntime) {
    return new PrismaClient().$extends(withAccelerate());
  }

  return new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const db = globalThis.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== 'production' && !isEdgeRuntime) globalThis.prisma = db;
