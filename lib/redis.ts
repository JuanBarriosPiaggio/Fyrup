import Redis from 'ioredis';

// Redis client singleton
let redis: Redis | null = null;

/**
 * Get or create Redis client
 * Returns null if REDIS_URL is not configured
 */
export function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    try {
      redis = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        reconnectOnError(err) {
          const targetError = 'READONLY';
          if (err.message.includes(targetError)) {
            // Reconnect on READONLY errors
            return true;
          }
          return false;
        },
      });

      redis.on('error', (err) => {
        console.error('Redis Client Error:', err);
      });

      redis.on('connect', () => {
        console.log('✅ Redis connected successfully');
      });
    } catch (error) {
      console.error('Failed to create Redis client:', error);
      return null;
    }
  }

  return redis;
}

/**
 * Customer count cache keys
 */
export const REDIS_KEYS = {
  CUSTOMER_COUNT: 'fyrup:customer_count',
  CUSTOMER_COUNT_UPDATED: 'fyrup:customer_count_updated',
  CUSTOMER_COUNT_LOCK: 'fyrup:customer_count_lock',
} as const;

/**
 * TTL for customer count cache: 6 hours
 */
export const CUSTOMER_COUNT_TTL = 6 * 60 * 60; // 6 hours in seconds
