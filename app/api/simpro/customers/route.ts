import { NextResponse } from 'next/server';
import { getRedisClient, REDIS_KEYS, CUSTOMER_COUNT_TTL } from '@/lib/redis';

const SIMPRO_API_URL = process.env.SIMPRO_API_URL;
const SIMPRO_TOKEN = process.env.SIMPRO_API_TOKEN;
const COMPANY_ID = process.env.SIMPRO_COMPANY_ID;

// Fallback in-memory cache (used only if Redis is not available)
let cachedCount: number | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    const redis = getRedisClient();
    const now = Date.now();

    // Try Redis first if available
    if (redis) {
      try {
        const cachedCountStr = await redis.get(REDIS_KEYS.CUSTOMER_COUNT);
        const cachedTimestampStr = await redis.get(REDIS_KEYS.CUSTOMER_COUNT_UPDATED);

        if (cachedCountStr && cachedTimestampStr) {
          const count = parseInt(cachedCountStr);
          const timestamp = parseInt(cachedTimestampStr);
          const cacheAge = Math.round((now - timestamp) / 1000 / 60); // in minutes

          console.log(`💾 [Redis] Returning cached customer count: ${count} unique customers (cache age: ${cacheAge} minutes)`);

          return NextResponse.json({
            count,
            cached: true,
            cacheAge,
            source: 'redis',
            lastUpdated: timestamp
          });
        } else {
          console.log('⚠️  [Redis] No cached count found, will trigger background refresh');

          // Trigger background refresh but return a placeholder for now
          // The background job will populate Redis
          return NextResponse.json({
            count: 100, // Placeholder
            cached: false,
            needsRefresh: true,
            source: 'redis',
            message: 'Background refresh triggered'
          });
        }
      } catch (redisError) {
        console.error('Redis error, falling back to in-memory cache:', redisError);
        // Fall through to in-memory cache
      }
    }

    // Fallback to in-memory cache if Redis is not available
    if (cachedCount !== null && cacheTimestamp !== null) {
      const cacheAge = now - cacheTimestamp;
      if (cacheAge < CACHE_DURATION) {
        console.log(`💾 [In-Memory] Returning cached customer count: ${cachedCount} unique customers (cache age: ${Math.round(cacheAge / 1000 / 60)} minutes)`);
        return NextResponse.json({
          count: cachedCount,
          cached: true,
          cacheAge: Math.round(cacheAge / 1000 / 60), // in minutes
          source: 'memory'
        });
      }
    }

    // No cache available - return placeholder and suggest refresh
    console.log('⚠️  No cache available, returning placeholder');
    return NextResponse.json({
      count: 100, // Placeholder
      cached: false,
      needsRefresh: true,
      source: redis ? 'redis' : 'memory',
      message: 'No cache available, use /api/simpro/customers/refresh to update'
    });

  } catch (error: any) {
    console.error('Customer count API error:', error);

    // Try to return any cached value as last resort
    const redis = getRedisClient();
    if (redis) {
      try {
        const cachedCountStr = await redis.get(REDIS_KEYS.CUSTOMER_COUNT);
        if (cachedCountStr) {
          const count = parseInt(cachedCountStr);
          console.log(`⚠️  [Redis] API error, returning stale cached count: ${count} unique customers`);
          return NextResponse.json({
            count,
            cached: true,
            stale: true,
            source: 'redis'
          });
        }
      } catch (redisError) {
        console.error('Redis fallback also failed:', redisError);
      }
    }

    // In-memory fallback
    if (cachedCount !== null) {
      console.log(`⚠️  [In-Memory] API error, returning stale cached count: ${cachedCount} unique customers`);
      return NextResponse.json({
        count: cachedCount,
        cached: true,
        stale: true,
        source: 'memory'
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch customer count', details: error.message },
      { status: 500 }
    );
  }
}
