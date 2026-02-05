/**
 * Next.js Instrumentation
 * This file is automatically called once when the server starts
 * Used to initialize background services like cron jobs
 */

export async function register() {
  // Only run on server side (not during build)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startCustomerCountCron } = await import('./lib/customer-count-cron');
    startCustomerCountCron();
  }
}
