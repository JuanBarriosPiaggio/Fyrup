import cron from 'node-cron';
import { getRedisClient, REDIS_KEYS, CACHE_TTL } from './redis';

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
        await redis.setex(REDIS_KEYS.CUSTOMER_COUNT, CACHE_TTL, customerCount.toString());
        await redis.setex(REDIS_KEYS.CUSTOMER_COUNT_UPDATED, CACHE_TTL, now.toString());
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
 * Refresh jobs completed count by processing all jobs
 */
async function refreshJobsCount() {
  const startTime = Date.now();
  
  try {
    console.log('🔄 [Cron] Starting jobs count refresh...');
    
    const redis = getRedisClient();

    // Optional: Check for lock to prevent concurrent refreshes
    if (redis) {
      const lockAcquired = await redis.set(
        REDIS_KEYS.JOBS_COUNT_LOCK,
        '1',
        'EX',
        300, // 5 minute lock
        'NX' // Only set if not exists
      );

      if (!lockAcquired) {
        console.log('⚠️  [Cron] Another jobs refresh is already in progress, skipping...');
        return;
      }
    }

    // Fetch ALL jobs and count completed ones
    let page = 1;
    let totalJobs = 0;
    let completedJobs = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `${SIMPRO_API_URL}/companies/${COMPANY_ID}/jobs/?pageSize=250&page=${page}&columns=ID,Status`,
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

      const jobs = await response.json();

      if (Array.isArray(jobs) && jobs.length > 0) {
        totalJobs += jobs.length;

        // Count jobs with Status.Name "Job : Completed"
        // Also count "Invoices : Fully-paid" as these are completed and invoiced
        jobs.forEach((job: any) => {
          const statusName = job.Status?.Name || '';
          if (statusName === 'Job : Completed' || statusName === 'Invoices : Fully-paid') {
            completedJobs++;
          }
        });

        // Check if we've reached the last page
        if (jobs.length < 250) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }

    const now = Date.now();
    const duration = Math.round((now - startTime) / 1000);

    console.log(`✅ [Cron] Processed ${totalJobs} jobs → ${completedJobs} completed jobs (took ${duration}s)`);

    // Store in Redis if available
    if (redis) {
      try {
        await redis.setex(REDIS_KEYS.JOBS_COUNT, CACHE_TTL, completedJobs.toString());
        await redis.setex(REDIS_KEYS.JOBS_COUNT_UPDATED, CACHE_TTL, now.toString());
        await redis.del(REDIS_KEYS.JOBS_COUNT_LOCK); // Release lock
        
        console.log(`💾 [Cron] Stored jobs count in Redis: ${completedJobs}`);
      } catch (redisError) {
        console.error('[Cron] Failed to store jobs count in Redis:', redisError);
      }
    }

  } catch (error: any) {
    console.error('[Cron] Jobs count refresh error:', error);

    // Release lock on error
    const redis = getRedisClient();
    if (redis) {
      try {
        await redis.del(REDIS_KEYS.JOBS_COUNT_LOCK);
      } catch (unlockError) {
        console.error('[Cron] Failed to release jobs lock:', unlockError);
      }
    }
  }
}

/**
 * Refresh all metrics (customers and jobs)
 */
async function refreshAllMetrics() {
  console.log('🔄 [Cron] Refreshing all metrics...');
  await Promise.all([
    refreshCustomerCount(),
    refreshJobsCount()
  ]);
  console.log('✅ [Cron] All metrics refreshed');
}

/**
 * Start the metrics cron job
 * Runs every 6 hours at minute 0 (00:00, 06:00, 12:00, 18:00)
 */
export function startCustomerCountCron() {
  // Check if we're in a server environment (not during build)
  if (typeof window !== 'undefined') {
    return; // Don't run in browser
  }

  console.log('⏰ Starting metrics cron job (runs every 6 hours)...');

  // Schedule: Every 6 hours at minute 0
  // Cron format: minute hour day month weekday
  // '0 */6 * * *' = At minute 0 of every 6th hour
  const task = cron.schedule('0 */6 * * *', () => {
    console.log('⏰ [Cron] Scheduled metrics refresh triggered');
    refreshAllMetrics();
  }, {
    timezone: 'UTC'
  });

  console.log('✅ Metrics cron job started successfully');
  console.log('   Refreshing: Customer count + Jobs completed count');
  console.log('   Next run times: 00:00, 06:00, 12:00, 18:00 UTC');

  // Also run once immediately on startup (after a short delay)
  setTimeout(() => {
    console.log('🚀 Running initial metrics refresh...');
    refreshAllMetrics();
  }, 5000); // 5 second delay to let app fully start

  return task;
}
