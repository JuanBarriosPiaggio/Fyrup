import cron from 'node-cron';
import { getRedisClient, REDIS_KEYS } from './redis';

const SIMPRO_API_URL = process.env.SIMPRO_API_URL;
const SIMPRO_TOKEN = process.env.SIMPRO_API_TOKEN;
const COMPANY_ID = process.env.SIMPRO_COMPANY_ID;

/**
 * Refresh customer count by processing all invoices
 * This is the core function that the cron job calls
 */
async function refreshCustomerCount() {
  const startTime = Date.now();
  
  try {
    console.log('🔄 [Cron] Starting customer count refresh...');
    
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
        console.log('⚠️  [Cron] Another refresh is already in progress, skipping...');
        return;
      }
    }

    // Fetch ALL invoices and count unique customers
    const uniqueCustomerIds = new Set<number>();
    let page = 1;
    let totalInvoices = 0;
    let hasMore = true;

    while (hasMore) {
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

        // Check if we've reached the last page
        if (invoices.length < 250) {
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

    console.log(`✅ [Cron] Processed ${totalInvoices} invoices → ${customerCount} unique customers (took ${duration}s)`);

    // Store in Redis if available
    if (redis) {
      try {
        const CUSTOMER_COUNT_TTL = 6 * 60 * 60; // 6 hours
        await redis.setex(REDIS_KEYS.CUSTOMER_COUNT, CUSTOMER_COUNT_TTL, customerCount.toString());
        await redis.setex(REDIS_KEYS.CUSTOMER_COUNT_UPDATED, CUSTOMER_COUNT_TTL, now.toString());
        await redis.del(REDIS_KEYS.CUSTOMER_COUNT_LOCK); // Release lock
        
        console.log(`💾 [Cron] Stored customer count in Redis: ${customerCount}`);
      } catch (redisError) {
        console.error('[Cron] Failed to store in Redis:', redisError);
      }
    }

  } catch (error: any) {
    console.error('[Cron] Customer count refresh error:', error);

    // Release lock on error
    const redis = getRedisClient();
    if (redis) {
      try {
        await redis.del(REDIS_KEYS.CUSTOMER_COUNT_LOCK);
      } catch (unlockError) {
        console.error('[Cron] Failed to release lock:', unlockError);
      }
    }
  }
}

/**
 * Start the customer count cron job
 * Runs every 6 hours at minute 0 (00:00, 06:00, 12:00, 18:00)
 */
export function startCustomerCountCron() {
  // Check if we're in a server environment (not during build)
  if (typeof window !== 'undefined') {
    return; // Don't run in browser
  }

  console.log('⏰ Starting customer count cron job (runs every 6 hours)...');

  // Schedule: Every 6 hours at minute 0
  // Cron format: minute hour day month weekday
  // '0 */6 * * *' = At minute 0 of every 6th hour
  const task = cron.schedule('0 */6 * * *', () => {
    console.log('⏰ [Cron] Scheduled customer count refresh triggered');
    refreshCustomerCount();
  }, {
    timezone: 'UTC'
  });

  console.log('✅ Customer count cron job started successfully');
  console.log('   Next run times: 00:00, 06:00, 12:00, 18:00 UTC');

  // Also run once immediately on startup (after a short delay)
  setTimeout(() => {
    console.log('🚀 Running initial customer count refresh...');
    refreshCustomerCount();
  }, 5000); // 5 second delay to let app fully start

  return task;
}
