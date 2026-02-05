import { NextResponse } from 'next/server';
import { getRedisClient, REDIS_KEYS, CUSTOMER_COUNT_TTL } from '@/lib/redis';

const SIMPRO_API_URL = process.env.SIMPRO_API_URL;
const SIMPRO_TOKEN = process.env.SIMPRO_API_TOKEN;
const COMPANY_ID = process.env.SIMPRO_COMPANY_ID;

// Fallback in-memory cache
let cachedCount: number | null = null;
let cacheTimestamp: number | null = null;

/**
 * Background job endpoint to refresh customer count
 * This processes ALL invoices and stores the count in Redis
 * Runs every 6 hours via cron or manual trigger
 */
export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    console.log('🔄 [Background Job] Starting full customer count refresh...');

    const redis = getRedisClient();

    // Optional: Check for lock to prevent concurrent refreshes
    if (redis) {
      const lockAcquired = await redis.set(
        REDIS_KEYS.CUSTOMER_COUNT_LOCK,
        '1',
        'EX',
        300, // 5 minute lock
        'NX' // Only set if not exists
      );

      if (!lockAcquired) {
        console.log('⚠️  Another refresh is already in progress, skipping...');
        return NextResponse.json({
          success: false,
          message: 'Another refresh is already in progress'
        }, { status: 429 });
      }
    }

    // Fetch ALL invoices and count unique customers
    const uniqueCustomerIds = new Set<number>();
    let page = 1;
    let totalInvoices = 0;
    let hasMore = true;

    console.log('📊 Fetching all invoices to count unique customers...');

    while (hasMore) {
      console.log(`  📄 Fetching page ${page}...`);

      const response = await fetch(
        `${SIMPRO_API_URL}/companies/${COMPANY_ID}/invoices/?pageSize=250&page=${page}&columns=ID,Customer`,
        {
          headers: {
            'Authorization': `Bearer ${SIMPRO_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          cache: 'no-store'
        }
      );

      if (!response.ok) {
        throw new Error(`Simpro API error: ${response.status} ${response.statusText}`);
      }

      const invoices = await response.json();

      if (Array.isArray(invoices) && invoices.length > 0) {
        totalInvoices += invoices.length;

        invoices.forEach((invoice: any) => {
          if (invoice.Customer && invoice.Customer.ID) {
            uniqueCustomerIds.add(invoice.Customer.ID);
          }
        });

        console.log(`  ✓ Page ${page}: ${invoices.length} invoices, ${uniqueCustomerIds.size} unique customers so far`);

        // Check if we've reached the last page
        if (invoices.length < 250) {
          console.log(`  ℹ️  Reached last page (only ${invoices.length} invoices on this page)`);
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }

    const customerCount = uniqueCustomerIds.size;
    const now = Date.now();
    const duration = Math.round((now - startTime) / 1000);

    console.log(`✅ COMPLETE: Processed ${totalInvoices} invoices → ${customerCount} unique customers (took ${duration}s)`);

    // Store in Redis if available
    if (redis) {
      try {
        await redis.setex(REDIS_KEYS.CUSTOMER_COUNT, CUSTOMER_COUNT_TTL, customerCount.toString());
        await redis.setex(REDIS_KEYS.CUSTOMER_COUNT_UPDATED, CUSTOMER_COUNT_TTL, now.toString());
        await redis.del(REDIS_KEYS.CUSTOMER_COUNT_LOCK); // Release lock

        console.log(`💾 [Redis] Stored customer count: ${customerCount} (TTL: ${CUSTOMER_COUNT_TTL / 3600}h)`);
      } catch (redisError) {
        console.error('Failed to store in Redis:', redisError);
      }
    }

    // Also update in-memory cache as fallback
    cachedCount = customerCount;
    cacheTimestamp = now;

    return NextResponse.json({
      success: true,
      count: customerCount,
      totalInvoices,
      duration,
      timestamp: now,
      ttl: CUSTOMER_COUNT_TTL,
      nextRefresh: new Date(now + CUSTOMER_COUNT_TTL * 1000).toISOString(),
      storage: redis ? 'redis' : 'memory'
    });

  } catch (error: any) {
    console.error('Customer count refresh error:', error);

    // Release lock on error
    const redis = getRedisClient();
    if (redis) {
      try {
        await redis.del(REDIS_KEYS.CUSTOMER_COUNT_LOCK);
      } catch (unlockError) {
        console.error('Failed to release lock:', unlockError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh customer count',
        details: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check refresh status
 */
export async function GET() {
  const redis = getRedisClient();

  if (redis) {
    try {
      const count = await redis.get(REDIS_KEYS.CUSTOMER_COUNT);
      const updated = await redis.get(REDIS_KEYS.CUSTOMER_COUNT_UPDATED);
      const isLocked = await redis.get(REDIS_KEYS.CUSTOMER_COUNT_LOCK);

      if (count && updated) {
        const timestamp = parseInt(updated);
        const ttl = await redis.ttl(REDIS_KEYS.CUSTOMER_COUNT);
        const nextRefresh = new Date(timestamp + CUSTOMER_COUNT_TTL * 1000).toISOString();

        return NextResponse.json({
          count: parseInt(count),
          lastUpdated: new Date(timestamp).toISOString(),
          ttl,
          nextRefresh,
          isRefreshing: isLocked === '1',
          storage: 'redis'
        });
      }
    } catch (error) {
      console.error('Redis status check error:', error);
    }
  }

  // Fallback to in-memory cache
  if (cachedCount !== null && cacheTimestamp !== null) {
    return NextResponse.json({
      count: cachedCount,
      lastUpdated: new Date(cacheTimestamp).toISOString(),
      storage: 'memory'
    });
  }

  return NextResponse.json({
    message: 'No cache available. Trigger a refresh with POST /api/simpro/customers/refresh',
    storage: redis ? 'redis' : 'memory'
  });
}
