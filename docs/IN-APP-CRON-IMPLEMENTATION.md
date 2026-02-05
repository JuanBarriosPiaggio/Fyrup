# In-App Cron Job Implementation

## Overview

The customer count refresh now uses an **in-app cron job** powered by `node-cron` instead of external services like GitHub Actions.

## Architecture

```
┌─────────────────────────────────────────────────┐
│  App Starts (Railway/Local)                    │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  instrumentation.ts                             │
│  - Runs once on server startup                  │
│  - Calls startCustomerCountCron()               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  lib/customer-count-cron.ts                     │
│  - Schedules cron job: '0 */6 * * *'            │
│  - Runs at 00:00, 06:00, 12:00, 18:00 UTC      │
│  - Also runs once 5 seconds after startup       │
└────────────────┬────────────────────────────────┘
                 │
                 ▼ (every 6 hours)
┌─────────────────────────────────────────────────┐
│  refreshCustomerCount()                         │
│  1. Acquire lock (prevent concurrent runs)      │
│  2. Fetch ALL invoices from Simpro              │
│  3. Count unique customer IDs                   │
│  4. Store in Redis (6-hour TTL)                 │
│  5. Release lock                                │
└─────────────────────────────────────────────────┘
```

## Implementation Files

### 1. `instrumentation.ts` (New)

Next.js instrumentation file that runs once on server startup:

```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startCustomerCountCron } = await import('./lib/customer-count-cron');
    startCustomerCountCron();
  }
}
```

### 2. `lib/customer-count-cron.ts` (New)

Core cron job implementation:

```typescript
import cron from 'node-cron';

// Refresh function that processes all invoices
async function refreshCustomerCount() { ... }

// Start cron job (runs every 6 hours)
export function startCustomerCountCron() {
  const task = cron.schedule('0 */6 * * *', () => {
    refreshCustomerCount();
  }, {
    timezone: 'UTC'
  });

  // Also run once on startup (after 5 second delay)
  setTimeout(() => {
    refreshCustomerCount();
  }, 5000);
}
```

### 3. `next.config.ts` (Updated)

No special configuration needed - instrumentation is enabled by default in Next.js 15.

## Cron Schedule

**Pattern:** `0 */6 * * *`

**Explanation:**
- `0` - At minute 0
- `*/6` - Every 6th hour
- `* * *` - Every day, month, weekday

**Runs at:**
- 00:00 UTC (midnight)
- 06:00 UTC (6 AM)
- 12:00 UTC (noon)
- 18:00 UTC (6 PM)

## Startup Behavior

When the app starts:
1. **Immediate refresh** - Runs 5 seconds after boot to populate cache quickly
2. **Schedule active** - Cron job starts and waits for next scheduled time

## Logs to Expect

On app startup:
```
⏰ Starting customer count cron job (runs every 6 hours)...
✅ Customer count cron job started successfully
   Next run times: 00:00, 06:00, 12:00, 18:00 UTC
🚀 Running initial customer count refresh...
🔄 [Cron] Starting customer count refresh...
✅ [Cron] Processed 2847 invoices → 450 unique customers (took 12s)
💾 [Cron] Stored customer count in Redis: 450
```

On scheduled run (every 6 hours):
```
⏰ [Cron] Scheduled customer count refresh triggered
🔄 [Cron] Starting customer count refresh...
✅ [Cron] Processed 2847 invoices → 450 unique customers (took 12s)
💾 [Cron] Stored customer count in Redis: 450
```

## Advantages

✅ **Self-contained** - No external dependencies  
✅ **Direct execution** - No HTTP overhead  
✅ **Simple** - One less thing to configure  
✅ **Fast** - Direct function calls  
✅ **Automatic** - Starts on every deployment  

## Trade-offs

⚠️ **May miss runs** - If app restarts at 5:59 and cron is at 6:00, that run is missed  
⚠️ **Scaling** - Multiple instances would run cron multiple times (not an issue for Railway single instance)  
⚠️ **Monitoring** - Need to check app logs instead of external service UI  

**User's decision:** These trade-offs are acceptable since this is not critical functionality.

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# Check logs for:
# "⏰ Starting customer count cron job..."
# "🚀 Running initial customer count refresh..."
```

### Production Testing

Check Railway logs after deployment for:
```
⏰ Starting customer count cron job (runs every 6 hours)...
✅ Customer count cron job started successfully
🚀 Running initial customer count refresh...
```

### Manual Trigger

You can still manually trigger a refresh anytime:

```bash
curl -X POST https://fyrup.up.railway.app/api/simpro/customers/refresh
```

## Concurrent Run Prevention

The cron job includes a Redis lock mechanism:

1. **Before refresh**: Tries to acquire lock (`fyrup:customer_count_lock`)
2. **Lock exists**: Skips run (another refresh in progress)
3. **After refresh**: Releases lock
4. **Auto-expire**: Lock expires after 5 minutes (prevents stuck locks)

## Configuration

To change the refresh frequency, edit `lib/customer-count-cron.ts`:

```typescript
// Current: Every 6 hours
cron.schedule('0 */6 * * *', ...)

// Every 3 hours:
cron.schedule('0 */3 * * *', ...)

// Every 12 hours:
cron.schedule('0 */12 * * *', ...)

// Daily at midnight:
cron.schedule('0 0 * * *', ...)
```

## Dependencies

- `node-cron` - Cron job scheduler
- `@types/node-cron` - TypeScript types

Both installed automatically with the deployment.

## Comparison to Previous Approach

| Feature | GitHub Actions | In-App Cron |
|---------|---------------|-------------|
| External dependency | Yes (GitHub) | No |
| Survives app restart | Yes | No (skips that run) |
| Scaling safe | Yes | No (runs per instance) |
| Setup required | Yes (workflow file) | No (automatic) |
| Monitoring | GitHub UI | App logs |
| HTTP overhead | Yes | No |
| User preference | ❌ | ✅ (chosen) |

## Future Improvements

If needed in the future:
1. **Distributed lock** - Use Redis locks to prevent multiple instances from running simultaneously
2. **Missed run detection** - Check last run timestamp and catch up if missed
3. **External monitoring** - Ping a service on each successful run
4. **Configurable schedule** - Move cron pattern to environment variable

## Summary

The in-app cron job provides a simple, self-contained solution for refreshing the customer count every 6 hours. It's perfect for non-critical functionality where occasional missed runs are acceptable.

**Status:** ✅ Implemented and ready for deployment
