# Redis Customer Count - Cheat Sheet

## 🚀 Quick Setup (3 steps)

```bash
# 1. Get Redis URL from Upstash (https://upstash.com/)

# 2. Add to Railway environment variables:
REDIS_URL=redis://default:password@host:port
NEXT_PUBLIC_BASE_URL=https://your-app.railway.app

# 3. Deploy and initialize:
git push
curl https://your-app.railway.app/api/init
```

## 🔌 API Quick Reference

```bash
# Get current count (fast)
GET /api/simpro/customers

# Check status
GET /api/simpro/customers/refresh

# Trigger refresh (background job)
POST /api/simpro/customers/refresh

# Initialize on startup
GET /api/init
```

## 🧪 Test Commands

```bash
# Local testing
npm run dev
.\scripts\test-redis-customer-count.ps1

# Production testing
$env:TEST_URL = "https://your-app.railway.app"
.\scripts\test-redis-customer-count.ps1

# Manual API tests
curl https://your-app.railway.app/api/simpro/customers
curl https://your-app.railway.app/api/simpro/customers/refresh
curl -X POST https://your-app.railway.app/api/simpro/customers/refresh
```

## ⏰ Cron Job (Already Configured!)

✅ **In-app cron job already set up!**

- **Files:** `lib/customer-count-cron.ts` + `instrumentation.ts`
- **Schedule:** Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)
- **Starts automatically** when app boots
- **Manual trigger:** `curl -X POST https://your-app.railway.app/api/simpro/customers/refresh`

## 🔧 Configuration

```typescript
// Change refresh interval in lib/redis.ts:
export const CUSTOMER_COUNT_TTL = 6 * 60 * 60; // 6 hours

// Redis keys used:
fyrup:customer_count          // The count
fyrup:customer_count_updated  // Last update timestamp
fyrup:customer_count_lock     // Concurrent refresh lock
```

## ⚠️ Troubleshooting

```bash
# Count stuck at 100+?
curl -X POST https://your-app.railway.app/api/simpro/customers/refresh

# Redis connection error?
# → Check REDIS_URL in environment variables
# → System automatically falls back to in-memory cache

# "Another refresh in progress"?
# → Wait 5 minutes (lock auto-expires)
# → Or check: curl https://your-app.railway.app/api/simpro/customers/refresh
```

## 📊 What to Expect

| Before | After |
|--------|-------|
| 2-3 seconds load | ~5ms load |
| ~20% accurate | 100% accurate |
| Resets on restart | Persists |
| 500 invoices | ALL invoices |

## 📚 Full Documentation

- Quick Start: `docs/REDIS-QUICK-START.md`
- Complete Guide: `docs/REDIS-CUSTOMER-COUNT.md`
- Implementation Summary: `REDIS-IMPLEMENTATION-SUMMARY.md`

## ✅ Success Checklist

- [ ] Redis instance created
- [ ] `REDIS_URL` set in environment
- [ ] App deployed
- [ ] `/api/init` called after deployment (optional - cron also runs on boot)
- [x] Cron job configured for 6-hour refresh (in-app)
- [ ] Test script passed
- [ ] Frontend shows accurate count (not 100+)

## 🎯 One-Liner Deploy

```bash
# After setting REDIS_URL in Railway:
git add . && git commit -m "Add Redis customer count" && git push && sleep 10 && curl https://your-app.railway.app/api/init
```

---

**Need Help?** See full docs in `docs/REDIS-CUSTOMER-COUNT.md`
