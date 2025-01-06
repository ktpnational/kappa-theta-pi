import { Redis } from '@upstash/redis';

import type { IRedisService } from '@/classes/redis.interface';

const {
  integrations: {
    upstash: {
      redis: { url, token },
    },
  },
} = await import('@/config').then((c) => c.config);

export class RedisService implements IRedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      url,
      token,
    });
  }

  async get<TData>(key: string): Promise<TData | null> {
    return this.redis.get(key);
  }

  async set<TData>(key: string, value: TData): Promise<'OK' | TData | null> {
    // Implementation for setting value in Redis
    return this.redis.set(key, value);
  }

  async expire(key: string, seconds: number): Promise<0 | 1> {
    // Implementation for setting expiration time for key in Redis
    return this.redis.expire(key, seconds);
  }

  async lrange<TResult = string>(key: string, start: number, end: number): Promise<TResult[]> {
    return this.redis.lrange(key, start, end);
  }

  async lpush<TData>(key: string, ...elements: TData[]): Promise<number> {
    return this.redis.lpush(key, elements);
  }
}
