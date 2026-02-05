# Redis Customer Count - Quick Start Guide

## 🚀 30-Second Setup

### 1. Get a Redis Instance

**Easiest: Upstash (Free, Serverless)**

```bash
# 1. Go to https://upstash.com/
# 2. Sign up (free)
# 3. Click "Create Database"
# 4. Copy the connection string
```

### 2. Add Environment Variable

Add to Railway or `.env.local`:

```bash
REDIS_URL=redis://default:YOUR_PASSWORD@HOST:PORT
```

### 3. Deploy & Initialize

```bash
# After deployment, run once:
curl https://your-app.railway.app/api/init

# Or test locally:
npm run dev
curl http://localhost:3000/api/init
```

Done! The customer count will now:
- ✅ Be accurate (counts ALL customers)
- ✅ Load instantly (< 5ms from Redis)
- ✅ Update every 6 hours automatically
- ✅ Persist across restarts

## 🧪 Test It

```bash
# Check the count
curl https://your-app.railway.app/api/simpro/customers

# Check cache status
curl https://your-app.railway.app/api/simpro/customers/refresh

# Manual refresh (processes all invoices)
curl -X POST https://your-app.railway.app/api/simpro/customers/refresh
```

Or use the PowerShell test script:

```powershell
# Local
.\scripts\test-redis-customer-count.ps1

# Production
$env:TEST_URL = "https://your-app.railway.app"
.\scripts\test-redis-customer-count.ps1
```

## 📅 Automated Refresh (Already Set Up!)

✅ **An in-app cron job is already configured** to refresh the customer count every 6 hours automatically.

**Implementation:** 
- `lib/customer-count-cron.ts` - Cron job logic
- `instrumentation.ts` - Starts cron on app boot

**Schedule:** Runs at 00:00, 06:00, 12:00, and 18:00 UTC (every 6 hours)

**Manual Trigger:** Call the refresh endpoint:
```bash
curl -X POST https://your-app.railway.app/api/simpro/customers/refresh
```

No additional setup needed! The cron job starts automatically when the app boots.

## 🔧 Without Redis (Fallback Mode)

If you don't set `REDIS_URL`, the system automatically uses in-memory caching:

- ✅ Still works
- ⚠️ Less accurate (samples only 500 invoices)
- ⚠️ 1-hour cache
- ⚠️ Resets on app restart

## 🆘 Troubleshooting

### "Count is stuck at 100+"

```bash
# Trigger a manual refresh
curl -X POST https://your-app.railway.app/api/simpro/customers/refresh
```

### "Redis connection error"

1. Check `REDIS_URL` is correct
2. Verify Redis instance is running
3. App will automatically fall back to in-memory cache

### "Another refresh is already in progress"

Wait 5 minutes (lock expires automatically) or check status:

```bash
curl https://your-app.railway.app/api/simpro/customers/refresh
```

## 📊 Expected Results

After setup, you should see in logs:

```
✅ Redis connected successfully
✅ Customer count already cached in Redis: 450 (expires in 5.8h)
💾 [Redis] Returning cached customer count: 450 unique customers (cache age: 23 minutes)
```

On the frontend, you'll see the actual count instead of a placeholder:

```
450+  ← Accurate count from Redis
Clients Served
```

## 🎯 Next Steps

1. ✅ Set up Redis
2. ✅ Deploy with `REDIS_URL`
3. ✅ Run `/api/init` once
4. ✅ Set up cron job for auto-refresh
5. 🎉 Done!

## 📚 Full Documentation

See [REDIS-CUSTOMER-COUNT.md](./REDIS-CUSTOMER-COUNT.md) for complete details.
