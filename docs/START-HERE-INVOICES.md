# 💰 START HERE - Unpaid Invoice Follow-up Automation

## ✅ What We Built (NEW WORKFLOW!)

An **automated payment reminder sequence** for unpaid invoices.

### The Sequence:

```
Invoice Issued (Day 0)
  ↓
Day 3: "Payment reminder - please pay soon"
  ↓
Day 7: "Payment overdue - please pay now"
  ↓
Day 14: "URGENT - payment required immediately"
  ↓
Day 21: "FINAL NOTICE - action required"
```

---

## 📁 Your Files

### 1. **Production Workflow** ⭐
`simpro-invoice-followup-sequence.json`

- Runs daily at 9 AM
- 4 different email templates (escalating)
- Sends reminders to unpaid invoices at day markers
- **USE THIS for production!**

### 2. **PowerShell Test** 🔍
`test-invoice-followup.ps1`

- Tests which invoices would trigger today
- Shows exact counts for each day (3, 7, 14, 21)
- Run this first to see expected volume

### 3. **Complete Guide** 📖
`INVOICE-FOLLOWUP-GUIDE.md`

- Full setup instructions
- Email template examples
- Troubleshooting
- Customization options

---

## 🎯 Quick Start (10 Minutes)

### Step 1: Test Current Data (1 min)

Run the PowerShell test to see what to expect:

```powershell
cd C:\Users\tree1\Desktop\Cursor\Fyrup
.\test-invoice-followup.ps1
```

**This shows:**
- How many unpaid invoices you have
- How many Day 3 reminders would send today
- How many Day 7 reminders would send today
- How many Day 14 reminders would send today
- How many Day 21 reminders would send today

### Step 2: Import to N8N (2 min)

1. Open N8N: https://n8n.juanbp.com/
2. Import: `simpro-invoice-followup-sequence.json`
3. Link "Fyrup Auth" credential (should auto-link)

### Step 3: Configure SMTP & Email (3 min)

1. Configure SMTP credentials
2. Update "From" email in all 4 Send Email nodes
3. **Change currency symbol:** `£` → `$` or `€` (in all 4 emails)

### Step 4: Test & Activate (2 min)

1. Test workflow manually
2. Verify unpaid invoices detected
3. Check customer emails retrieved
4. Activate!

**Done!** Workflow runs daily at 9 AM automatically.

---

## 📊 What to Expect

### How It Works

The workflow:
1. ✅ Gets ALL invoices from Simpro
2. ✅ Filters for **UNPAID invoices** (`IsPaid: false`)
3. ✅ Calculates days since `DateIssued`
4. ✅ Sends reminders at exact day markers (3, 7, 14, 21)
5. ✅ **Automatically stops when invoice is paid!**

### Daily Volume

Typically **3-8 reminder emails per day** depending on:
- How many invoices you issue daily
- Customer payment behavior
- Your payment terms

### Example Day:

```
Today: January 23, 2026

Invoices issued on Jan 20 (3 days ago): 2 unpaid → 2 Day 3 reminders
Invoices issued on Jan 16 (7 days ago): 1 unpaid → 1 Day 7 reminder
Invoices issued on Jan 9 (14 days ago): 1 unpaid → 1 Day 14 reminder
Invoices issued on Jan 2 (21 days ago): 1 unpaid → 1 Day 21 reminder

Total emails today: 5 payment reminders
```

### Each Unpaid Invoice Gets:

Over its lifecycle, each unpaid invoice receives:
- **1 reminder at Day 3** (friendly)
- **1 reminder at Day 7** (overdue)
- **1 reminder at Day 14** (urgent)
- **1 reminder at Day 21** (final notice)

**Total: 4 reminders per unpaid invoice over 21 days**

**Once paid → reminders stop automatically!**

---

## 🎨 Email Templates

### Day 3: Friendly Reminder
**Subject:** Payment Reminder - Invoice #[ID]  
**Purpose:** Polite reminder  
**Tone:** Professional, friendly

### Day 7: Payment Overdue
**Subject:** Payment Overdue - Invoice #[ID]  
**Purpose:** Inform payment is now late  
**Tone:** Firm, professional

### Day 14: Urgent
**Subject:** URGENT: Payment Required - Invoice #[ID]  
**Purpose:** Serious reminder with consequences  
**Tone:** Urgent, serious

### Day 21: Final Notice
**Subject:** FINAL NOTICE: Invoice #[ID] - Action Required  
**Purpose:** Last warning before escalation  
**Tone:** Final notice, legal action threatened

---

## ⚙️ How It Works (Technical)

### Smart Filtering

The workflow automatically:
- ✅ Gets ALL invoices from `/api/v1.0/companies/0/invoices/`
- ✅ Filters for `IsPaid: false` (unpaid only)
- ✅ Calculates days since `DateIssued`
- ✅ Filters for EXACT day markers (3, 7, 14, 21)
- ✅ Gets customer emails via `_href` pattern
- ✅ Sends appropriate reminder template

### No Duplicates

Reminders only send on **exact days**:
- Invoice issued Jan 1
- Day 3 reminder: Jan 4 ✅
- Days 4-6: No reminders ❌
- Day 7 reminder: Jan 8 ✅
- Days 8-13: No reminders ❌
- Day 14 reminder: Jan 15 ✅
- Days 15-20: No reminders ❌
- Day 21 reminder: Jan 22 ✅

**Once paid → all future reminders stop!**

---

## ⚠️ Important Notes

### 1. IsPaid Field

The workflow relies on Simpro's `IsPaid` field:
- `IsPaid: false` → Invoice is unpaid → Send reminders ✅
- `IsPaid: true` → Invoice is paid → Stop reminders ❌

Simpro automatically updates this when payment is received.

### 2. Currency Symbol

**Change `£` to your currency in all 4 email templates:**
- UK: `£`
- US/AU: `$`
- EU: `€`

### 3. Legal Compliance

**Review your local laws regarding:**
- Debt collection practices
- Required disclosures
- Interest charges
- Final notice requirements

---

## 🛠️ Customization

### Change Follow-up Days

Want 2, 5, 10, 15 instead of 3, 7, 14, 21?

**Edit:** "Filter Unpaid Invoices for Follow-up" node  
**Change lines:**
```javascript
if (daysSinceIssued === 3) {  // Change to 2
if (daysSinceIssued === 7) {  // Change to 5
if (daysSinceIssued === 14) { // Change to 10
if (daysSinceIssued === 21) { // Change to 15
```

### Change Email Content

**Edit:** Each "Send Day X Email" node  
**Customize:**
- Subject line
- Email body
- Tone and urgency
- Consequences mentioned

### Change Schedule

**Edit:** "Schedule Trigger" node  
**Change cron expression:**
- 9 AM: `0 9 * * *`
- 2 PM: `0 14 * * *`
- Twice daily (9 AM & 5 PM): Add second schedule

---

## 📈 Success Metrics

### Week 1
- ✅ Workflow runs daily without errors
- ✅ Correct unpaid invoices selected
- ✅ Reminders sending successfully
- ✅ No reminders to paid invoices

### Month 1
- ✅ Reduced average days to payment
- ✅ Fewer overdue invoices
- ✅ Reduced manual follow-up work
- ✅ Improved cash flow

### Long Term
- ✅ Faster payment cycles
- ✅ Better customer payment behavior
- ✅ Automated collections
- ✅ Reduced bad debt

---

## 🎉 You're Ready!

### Your Next Action:

**Option 1: Test First** (Recommended)
```powershell
1. Run: test-invoice-followup.ps1
2. Import: simpro-invoice-followup-sequence.json
3. Configure SMTP & emails
4. Test & verify
5. Activate
```

**Option 2: Deploy Directly**
```
1. Import: simpro-invoice-followup-sequence.json
2. Configure SMTP
3. Update emails & currency
4. Activate
```

---

## 📞 Need Help?

Check these in order:
1. `INVOICE-FOLLOWUP-GUIDE.md` - Full documentation
2. N8N Executions tab - See what's happening
3. PowerShell test - Verify invoice data
4. Node outputs - Debug step-by-step

---

## 🔥 Two Workflows Ready!

You now have **TWO separate workflows:**

### 1. Quote Follow-up (Created Earlier)
`simpro-quote-followup-sequence.json`
- Follows up on active quotes
- Days 3, 7, 14, 21 after quote issued
- Encourages quote acceptance

### 2. Invoice Follow-up (New!)
`simpro-invoice-followup-sequence.json`
- Follows up on unpaid invoices
- Days 3, 7, 14, 21 after invoice issued
- Encourages payment

**Both run independently and automatically!**

---

**Status:** ✅ **READY TO DEPLOY - GET PAID FASTER!**

**Main File:** `simpro-invoice-followup-sequence.json`

💰 **Your invoices will now chase themselves!**
