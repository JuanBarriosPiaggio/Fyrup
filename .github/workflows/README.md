# GitHub Actions Workflows

This directory contains automated workflows that run on GitHub Actions.

## Refresh Customer Count

**File:** `refresh-customer-count.yml`

**Purpose:** Automatically refreshes the Redis-cached customer count every 6 hours by calling the background refresh API endpoint.

**Schedule:** 
- Runs at 00:00, 06:00, 12:00, and 18:00 UTC (every 6 hours)
- Also runs on manual trigger

**What it does:**
1. Calls `POST /api/simpro/customers/refresh` to process all invoices
2. Counts unique customers
3. Stores the result in Redis with a 6-hour TTL
4. Verifies the cache status

**Manual Trigger:**
1. Go to GitHub → Actions tab
2. Select "Refresh Customer Count" workflow
3. Click "Run workflow"
4. Click the green "Run workflow" button

**Monitoring:**
- Check the Actions tab to see run history
- View logs for each run to see success/failure
- Runs show customer count, total invoices processed, and duration

**Status:**
- ✅ Automatically runs every 6 hours
- ✅ No external services required
- ✅ Free for public and private repos
- ✅ Logs available for debugging

**Notes:**
- If a refresh is already running, returns 429 status (this is OK)
- Lock automatically expires after 5 minutes
- Workflow will retry failed runs on next schedule
