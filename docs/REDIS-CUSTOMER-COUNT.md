# Redis-Based Customer Count System

## Overview

The customer count feature now uses Redis for accurate, persistent caching with automatic background refresh every 6 hours. This replaces the previous in-memory cache that only sampled 500 invoices.

## Features

- ✅ **Accurate count**: Processes ALL invoices to count unique customers
- ✅ **Fast response**: Instant Redis reads (~5ms)
- ✅ **Persistent cache**: Survives app restarts
- ✅ **Automatic refresh**: Updates every 6 hours
- ✅ **Fallback support**: Works without Redis (uses in-memory cache)
- ✅ **Background processing**: No impact on page load times

## Architecture

```
┌─────────────────┐
│  User visits    │
│  homepage       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ CustomerCounter │─────▶│ GET /api/    │
│   Component     │      │ simpro/      │
└─────────────────┘      │ customers    │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ Check Redis  │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
              [Cache Hit]             [Cache Miss]
                    │                       │
                    ▼                       ▼
            ┌──────────────┐      ┌──────────────┐
            │ Return count │      │ Return 100+  │
            │ immediately  │      │ (placeholder)│
            └──────────────┘      └──────────────┘

┌─────────────────────────────────────────────────┐
│          Background Refresh (Every 6h)          │
├─────────────────────────────────────────────────┤
│ POST /api/simpro/customers/refresh              │
│                                                 │
│ 1. Fetch ALL invoices (paginated)              │
│ 2. Count unique customer IDs                   │
│ 3. Store in Redis with 6-hour TTL              │
│ 4. Release lock                                 │
└─────────────────────────────────────────────────┘
```

## Environment Configuration

### Required Variables

Add to your `.env.local` or Railway environment variables:

```bash
# Redis Configuration
REDIS_URL=redis://default:password@host:port

# Base URL (for initialization)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Optional (Fallback Mode)

If `REDIS_URL` is not set, the system automatically falls back to in-memory caching with a 1-hour TTL.

## API Endpoints

### 1. GET `/api/simpro/customers`

Returns the current cached customer count.

**Response (with Redis):**
```json
{
  "count": 450,
  "cached": true,
  "cacheAge": 45,
  "source": "redis",
  "lastUpdated": 1707145200000
}
```

**Response (cache miss):**
```json
{
  "count": 100,
  "cached": false,
  "needsRefresh": true,
  "source": "redis",
  "message": "Background refresh triggered"
}
```

### 2. POST `/api/simpro/customers/refresh`

Triggers a full customer count refresh (background job).

**Response:**
```json
{
  "success": true,
  "count": 450,
  "totalInvoices": 2847,
  "duration": 12,
  "timestamp": 1707145200000,
  "ttl": 21600,
  "nextRefresh": "2026-02-05T18:00:00.000Z",
  "storage": "redis"
}
```

**Features:**
- Processes ALL invoices (not just a sample)
- Prevents concurrent refreshes with a lock
- Updates Redis with 6-hour TTL
- Returns detailed statistics

### 3. GET `/api/simpro/customers/refresh`

Check refresh status and cache info.

**Response:**
```json
{
  "count": 450,
  "lastUpdated": "2026-02-05T12:00:00.000Z",
  "ttl": 18000,
  "nextRefresh": "2026-02-05T18:00:00.000Z",
  "isRefreshing": false,
  "storage": "redis"
}
```

### 4. GET `/api/init`

Initialize the app on startup (checks Redis and triggers refresh if empty).

**Response:**
```json
{
  "success": true,
  "message": "Initialization completed",
  "timestamp": "2026-02-05T12:00:00.000Z"
}
```

## Deployment Setup

### Step 1: Add Redis Instance

**Option A: Railway Redis**
```bash
# In Railway dashboard:
# 1. Click "New" → "Database" → "Add Redis"
# 2. Copy the REDIS_URL from the connection tab
# 3. Add to your environment variables
```

**Option B: Upstash (Serverless)**
```bash
# 1. Visit https://upstash.com/
# 2. Create a new Redis database
# 3. Copy the connection string
# 4. Add as REDIS_URL environment variable
```

**Option C: Redis Cloud**
```bash
# 1. Visit https://redis.com/try-free/
# 2. Create a free database (30MB)
# 3. Get connection string
# 4. Add as REDIS_URL environment variable
```

### Step 2: Set Environment Variables

In Railway (or your hosting platform):

```bash
REDIS_URL=redis://default:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT
NEXT_PUBLIC_BASE_URL=https://your-app.railway.app
SIMPRO_API_URL=https://your-subdomain.simprosuite.com/api/v1.0
SIMPRO_API_TOKEN=your_token
SIMPRO_COMPANY_ID=0
```

### Step 3: Initialize After Deployment

After deploying, trigger the initial cache population:

```bash
curl -X GET https://your-app.railway.app/api/init
```

This will check Redis and trigger a background refresh if empty.

### Step 4: Set Up Automated Refresh

**Option A: Cron Job (Recommended)**

Use a service like [cron-job.org](https://cron-job.org) or Railway's cron add-on:

```bash
# Run every 6 hours
0 */6 * * * curl -X POST https://your-app.railway.app/api/simpro/customers/refresh
```

**Option B: Manual Trigger**

You can manually trigger a refresh anytime:

```bash
curl -X POST https://your-app.railway.app/api/simpro/customers/refresh
```

## Testing Locally

### 1. Without Redis (Fallback Mode)

```bash
# Don't set REDIS_URL
npm run dev

# Visit http://localhost:3000
# Should work with in-memory cache
```

### 2. With Redis

```bash
# Install Redis locally (macOS)
brew install redis
brew services start redis

# Or use Docker
docker run -d -p 6379:6379 redis

# Set in .env.local
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Start app
npm run dev

# Initialize
curl http://localhost:3000/api/init

# Check status
curl http://localhost:3000/api/simpro/customers/refresh

# Trigger manual refresh
curl -X POST http://localhost:3000/api/simpro/customers/refresh
```

## Redis Keys Used

```bash
fyrup:customer_count          # The actual count (integer)
fyrup:customer_count_updated  # Last update timestamp (integer)
fyrup:customer_count_lock     # Lock to prevent concurrent refreshes
```

All keys have a 6-hour TTL (21600 seconds).

## Monitoring

### Check Cache Status

```bash
curl https://your-app.railway.app/api/simpro/customers/refresh
```

### View Logs

Check your Railway logs for these messages:

```
✅ [Redis] Stored customer count: 450 (TTL: 6h)
💾 [Redis] Returning cached customer count: 450 unique customers (cache age: 45 minutes)
🔄 [Background Job] Starting full customer count refresh...
✅ COMPLETE: Processed 2847 invoices → 450 unique customers (took 12s)
```

## Troubleshooting

### Redis Connection Fails

**Symptom:** Logs show "Redis Client Error"

**Solution:**
1. Check `REDIS_URL` is correct
2. Verify Redis instance is running
3. Check firewall/network settings
4. System will automatically fall back to in-memory cache

### Count Not Updating

**Symptom:** Count stays at 100+

**Solution:**
1. Check if refresh is running: `GET /api/simpro/customers/refresh`
2. Manually trigger refresh: `POST /api/simpro/customers/refresh`
3. Check logs for errors
4. Verify Simpro API credentials are correct

### Lock Stuck

**Symptom:** Refresh always returns "Another refresh is already in progress"

**Solution:**
Lock expires automatically after 5 minutes. Or manually delete it:

```bash
# Using redis-cli
redis-cli
> DEL fyrup:customer_count_lock
```

## Performance

- **Cache hit (Redis):** ~5ms response time
- **Full refresh:** ~10-15 seconds for 3000 invoices
- **TTL:** 6 hours (refreshes 4 times per day)
- **Lock timeout:** 5 minutes (prevents stuck refreshes)

## Migration Notes

### From Old System

The old system:
- Only sampled 500 invoices (2 pages)
- Cached for 1 hour in memory
- Reset on app restart
- Inaccurate count

The new system:
- Processes ALL invoices
- Persistent Redis cache (6 hours)
- Survives restarts
- Accurate count
- Faster response times

### No Breaking Changes

The API response format is backward compatible. Existing code will continue to work.

## Future Enhancements

Possible improvements:

1. **Real-time updates**: Use Redis Sets with SADD/SCARD for instant updates
2. **Webhooks**: Update count when new customers are created in Simpro
3. **Analytics**: Track customer growth over time
4. **Dashboard**: Admin panel to view cache status and trigger refreshes
5. **Multiple metrics**: Cache job count, quote count, etc.

## Support

For issues or questions:
1. Check Railway logs
2. Review this documentation
3. Test with manual API calls
4. Verify environment variables
