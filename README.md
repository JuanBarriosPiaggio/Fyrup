# Fyrup - Simpro Automation

Next.js website with business intelligence dashboard and N8N workflow automation for quote and invoice follow-ups.

## Project Structure

```
📁 Fyrup/
├── 📁 app/                    # Next.js website pages
├── 📁 components/             # React components
├── 📁 public/                 # Static assets
├── 📁 docs/                   # 📚 All documentation
├── 📁 scripts/                # 🧪 Test scripts (PowerShell)
├── 📁 workflows-archive/      # 📦 Old/test N8N workflows
│
├── simpro-quote-followup-sequence.json      # ✅ PRODUCTION: Quote follow-ups
├── simpro-invoice-followup-sequence.json    # ✅ PRODUCTION: Invoice follow-ups
└── swagger.json               # Simpro API documentation
```

## Quick Start

### Environment Setup (Required)

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your Simpro credentials in `.env.local`:**
   ```env
   SIMPRO_API_URL=https://your-subdomain.simprosuite.com/api/v1.0
   SIMPRO_API_TOKEN=your_api_token_here
   SIMPRO_COMPANY_ID=0
   ```

3. **For Railway deployment:**
   - Set these same variables in Railway's environment variables dashboard
   - Never commit `.env.local` to version control

### For Dashboard
```bash
npm install
npm run dev
# Navigate to http://localhost:3000/dashboard
```

### For N8N Workflows
1. Go to `docs/START-HERE-FOLLOWUP.md` for quote follow-ups
2. Go to `docs/START-HERE-INVOICES.md` for invoice follow-ups

### For Testing
Run any script from the `scripts/` folder to test API connectivity:
```powershell
.\scripts\test-quote-followup.ps1
.\scripts\test-invoice-followup.ps1
```

## Simpro Dashboard

**Route:** `/dashboard`  
**Status:** ✅ LIVE with real-time Simpro data

A modern business intelligence dashboard displaying real-time metrics from Simpro:
- Financial summary cards (invoices, quotes, payments)
- Actionable alerts (overdue invoices, pending quotes)
- Visual charts (status distribution, conversion funnel)
- Recent jobs table
- Top estimators performance
- Key performance indicators

**Features:**
- ✅ **Live Simpro API integration** - Real data from your Simpro instance
- Clean SaaS-style UI inspired by modern design principles
- Date range filtering (7/30/90 days)
- Branch/team filtering
- Export to PDF/CSV (ready to implement)
- Theme toggle (Copper/Orange)
- Fully responsive design
- Loading states and error handling

**Documentation:** 
- Quick overview: `docs/DASHBOARD-SUMMARY.md`
- API integration: `docs/DASHBOARD-LIVE-INTEGRATION.md`

## Production Workflows

### Quote Follow-up Sequence
**File:** `simpro-quote-followup-sequence.json`
- Sends follow-up emails for open quotes
- Timeline: Day 3, 7, 14, 21 after DateIssued
- Filters out Accepted/Declined/Lost/Completed quotes

### Invoice Follow-up Sequence
**File:** `simpro-invoice-followup-sequence.json`
- Sends payment reminders for unpaid invoices
- Timeline: Day 3, 7, 14, 21 after DateIssued
- Only processes unpaid invoices (IsPaid: false)

## Documentation

All setup guides, troubleshooting, and technical docs are in the `docs/` folder:
- `docs/COMPLETE-WORKFLOW-SUMMARY.md` - Overview of both workflows
- `docs/QUOTE-FOLLOWUP-GUIDE.md` - Quote workflow setup
- `docs/INVOICE-FOLLOWUP-GUIDE.md` - Invoice workflow setup
- `docs/CONFIGURATION-CHECKLIST.md` - Pre-deployment checklist

## Website Development

This is a Next.js project:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
