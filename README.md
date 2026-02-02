# Fyrup - Simpro Automation

Website and N8N workflow automation for quote and invoice follow-ups.

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

### For N8N Workflows
1. Go to `docs/START-HERE-FOLLOWUP.md` for quote follow-ups
2. Go to `docs/START-HERE-INVOICES.md` for invoice follow-ups

### For Testing
Run any script from the `scripts/` folder to test API connectivity:
```powershell
.\scripts\test-quote-followup.ps1
.\scripts\test-invoice-followup.ps1
```

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
