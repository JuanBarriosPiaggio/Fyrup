import { getRedisClient, REDIS_KEYS } from './redis';

/**
 * Initialize customer count on app startup
 * Triggers a background refresh if Redis is empty
 */
export async function initCustomerCount() {
  const redis = getRedisClient();

  if (!redis) {
    console.log('⚠️  Redis not configured, skipping customer count initialization');
    return;
  }

  try {
    const cachedCount = await redis.get(REDIS_KEYS.CUSTOMER_COUNT);

    if (!cachedCount) {
      console.log('🔄 Redis customer count is empty, triggering background refresh...');

      // Trigger the refresh endpoint asynchronously (fire and forget)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      fetch(`${baseUrl}/api/simpro/customers/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('✅ Customer count refresh triggered successfully');
          } else {
            console.error('❌ Failed to trigger customer count refresh:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('❌ Error triggering customer count refresh:', error);
        });
    } else {
      const count = parseInt(cachedCount);
      const ttl = await redis.ttl(REDIS_KEYS.CUSTOMER_COUNT);
      const hours = Math.round(ttl / 3600 * 10) / 10; // Round to 1 decimal
      console.log(`✅ Customer count already cached in Redis: ${count} (expires in ${hours}h)`);
    }
  } catch (error) {
    console.error('Error initializing customer count:', error);
  }
}
