// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Detect Edge Runtime
const isEdgeRuntime = typeof globalThis.EdgeRuntime === 'string';

// Prevent Prisma from being instantiated in browser or Edge Runtime
if (typeof window !== 'undefined' || isEdgeRuntime) {
  throw new Error(`PrismaClient cannot be used in ${isEdgeRuntime ? 'Edge Runtime' : 'browser'} environment`);
}

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;