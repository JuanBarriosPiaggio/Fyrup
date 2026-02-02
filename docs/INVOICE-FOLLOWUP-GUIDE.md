# 💰 Unpaid Invoice Follow-up Automation - Complete Guide

## What This Does

**Automatically sends payment reminder emails for unpaid invoices at specific intervals after the invoice was issued.**

This ensures you get paid on time and reduces manual follow-up work.

---

## 📧 The Follow-up Sequence

### Day 3 After Invoice Issued
**Subject:** Payment Reminder - Invoice #[ID]  
**Purpose:** Friendly reminder that payment is due  
**Tone:** Professional, friendly

### Day 7 After Invoice Issued
**Subject:** Payment Overdue - Invoice #[ID]  
**Purpose:** Notify that payment is now overdue  
**Tone:** Firm, professional

### Day 14 After Invoice Issued
**Subject:** URGENT: Payment Required - Invoice #[ID]  
**Purpose:** Urgent reminder with consequences  
**Tone:** Serious, urgent

### Day 21 After Invoice Issued
**Subject:** FINAL NOTICE: Invoice #[ID] - Action Required  
**Purpose:** Final warning before escalation  
**Tone:** Final notice, serious consequences

---

## 🎯 How It Works

```
Daily Schedule (9 AM)
  ↓
Get ALL Invoices
  → With DateIssued, IsPaid, Total, Customer
  ↓
Filter UNPAID Invoices (IsPaid = false)
  ↓
Calculate Days Since Issued
  → DateIssued to Today
  ↓
Filter by Exact Day Markers
  → Exactly 3, 7, 14, or 21 days ago
  ↓
Get Customer Details
  → Via _href pattern (includes Email)
  ↓
Switch by Follow-up Type
  → Route to correct email template
  ↓
Send Payment Reminder Email
  → Day 3, 7, 14, or 21 template
```

---

## ✅ Key Features

### Automatic Filtering
- Only processes **UNPAID** invoices (`IsPaid: false`)
- Sends reminders on **exact day markers** (3, 7, 14, 21)
- Runs daily, so no invoices are missed

### No Duplicate Emails
- Once an invoice is 3 days old, it gets Day 3 reminder
- Next day (4 days old), no email
- Day 7, it gets Day 7 reminder
- Stops when invoice is paid

### Customer Email Retrieval
- Uses the proven `_href` pattern
- Gets full customer details including Email
- Skips invoices with no customer email

---

## 📁 Files

### Production: `simpro-invoice-followup-sequence.json`

**This is your main workflow!**

✅ Schedule trigger (9 AM daily)  
✅ 4 different email templates (escalating urgency)  
✅ Smart filtering by IsPaid status  
✅ Exact day matching (3, 7, 14, 21)  

---

## 🚀 Setup Instructions (10 Minutes)

### Step 1: Import Workflow

1. Open N8N: https://n8n.juanbp.com/
2. Click "+" → "Import from File"
3. Select: `simpro-invoice-followup-sequence.json`
4. Click "Import"

### Step 2: Link Credentials

**Simpro API (Already Done)**
- All HTTP Request nodes use: "Fyrup Auth"
- Should auto-link to your existing credential
- Test: Click on "Get All Invoices" node → "Test step"

**SMTP (Email Sending)**
- Click on "Send Day 3 Email" node
- Click "Credential for Sending Email"
- Select your SMTP account or create new one

### Step 3: Update Email Addresses & Currency

**For ALL 4 Send Email nodes:**

1. **Send Day 3 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   - Change currency symbol if needed: `£` → `$` or `€`
   
2. **Send Day 7 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   - Change currency symbol if needed
   
3. **Send Day 14 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   - Change currency symbol if needed
   
4. **Send Day 21 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   - Change currency symbol if needed

### Step 4: Customize Email Templates (Optional)

Each email template can be customized in the "message" field of each Send Email node.

**Available variables:**
- `{{ $json.customerName }}` - Customer name
- `{{ $json.invoiceID }}` - Invoice number
- `{{ $json.dateIssued }}` - When invoice was issued
- `{{ $json.daysSinceIssued }}` - Days since issued
- `{{ $json.balanceDue }}` - Amount still owed
- `{{ $json.totalAmount }}` - Total invoice amount

### Step 5: Test First (Recommended)

Run the PowerShell test to see what to expect:

```powershell
cd C:\Users\tree1\Desktop\Cursor\Fyrup
.\test-invoice-followup.ps1
```

### Step 6: Activate

1. Click "Active" toggle (top right)
2. Workflow will run daily at 9 AM
3. Monitor executions in "Executions" tab

---

## 📊 What to Expect

### Typical Daily Volume

Depends on:
- How many invoices you issue daily
- Your payment terms
- Customer payment behavior

**Example:**
- If you issue 5-10 invoices per day
- You might send 5-15 reminders per day across all levels

### Each Unpaid Invoice Gets:

Over its lifecycle, each unpaid invoice receives:
- **1 email at Day 3** (friendly reminder)
- **1 email at Day 7** (payment overdue)
- **1 email at Day 14** (urgent)
- **1 email at Day 21** (final notice)

**Total: 4 emails per unpaid invoice over 21 days**

Once paid → emails stop automatically!

---

## ⚠️ Important Notes

### IsPaid Status

The workflow automatically:
- ✅ Sends reminders for `IsPaid: false`
- ❌ Skips invoices with `IsPaid: true`

Once a customer pays, Simpro updates `IsPaid` to `true` and reminders stop automatically.

### Exact Day Matching

Emails only send on **exact days** (3, 7, 14, 21).

**Example:**
- Invoice issued: January 1
- Day 3 email: January 4 ✅
- Day 4: No email ❌
- Day 5: No email ❌
- Day 6: No email ❌
- Day 7 email: January 8 ✅

### Currency Symbol

**Change `£` to your currency:**
- UK: `£`
- US: `$`
- EU: `€`
- AU: `$`

Update all 4 email templates!

---

## 📧 Email Template Examples

### Day 3 Email (Friendly Reminder)

**Subject:** Payment Reminder - Invoice #10123

**Body:**
```
Hi ABC Company,

This is a friendly reminder that we have not yet received payment for the invoice below.

Invoice Details:
• Invoice #: 10123
• Date Issued: 2026-01-20
• Amount Due: £1,500.00

If you have already made this payment, please disregard this message. Otherwise, please arrange payment at your earliest convenience.

If you have any questions, please don't hesitate to contact us.

Best regards,
Your Team
```

### Day 7 Email (Payment Overdue)

**Subject:** Payment Overdue - Invoice #10123

**Body:**
```
Hi ABC Company,

Our records show that payment for the invoice below is now overdue.

Invoice Details:
• Invoice #: 10123
• Date Issued: 2026-01-20
• Amount Due: £1,500.00
• Days Overdue: 7

Please arrange payment as soon as possible to avoid any late payment fees or service interruption.

If you have any questions or concerns about this invoice, please contact us immediately.

Best regards,
Your Team
```

### Day 14 Email (Urgent)

**Subject:** URGENT: Payment Required - Invoice #10123

**Body:**
```
Hi ABC Company,

This is an urgent reminder that your invoice payment is significantly overdue.

Invoice Details:
• Invoice #: 10123
• Date Issued: 2026-01-20
• Amount Due: £1,500.00
• Days Overdue: 14

Immediate payment is required to avoid:
• Late payment fees
• Service suspension
• Referral to debt collection

Please contact us urgently if there are any issues preventing payment.

Best regards,
Your Team
```

### Day 21 Email (Final Notice)

**Subject:** FINAL NOTICE: Invoice #10123 - Action Required

**Body:**
```
Hi ABC Company,

FINAL NOTICE: This is our final reminder regarding the overdue invoice below.

Invoice Details:
• Invoice #: 10123
• Date Issued: 2026-01-20
• Amount Due: £1,500.00
• Days Overdue: 21

If payment is not received within 7 days, we will be forced to:
• Suspend all services
• Apply late payment fees
• Refer this matter to a debt collection agency
• Report to credit agencies

Please contact us immediately to arrange payment or discuss payment terms.

Best regards,
Your Team
```

---

## 🔧 Customization Options

### Change Follow-up Days

To change from 3, 7, 14, 21 to different days:

1. Go to "Filter Unpaid Invoices for Follow-up" node
2. Edit the JavaScript code
3. Change lines:
   ```javascript
   if (daysSinceIssued === 3) {  // Change to your desired day
   if (daysSinceIssued === 7) {  // Change to your desired day
   if (daysSinceIssued === 14) { // Change to your desired day
   if (daysSinceIssued === 21) { // Change to your desired day
   ```

### Change Email Schedule

To run at different time (e.g., 2 PM):

1. Click "Schedule Trigger" node
2. Change cron expression:
   - 9 AM: `0 9 * * *`
   - 2 PM: `0 14 * * *`
   - 6 PM: `0 18 * * *`

### Add More Follow-ups

To add Day 30, Day 60, etc:

1. Add condition in filter node
2. Update Switch node with new output
3. Add new Send Email node
4. Connect switch output to new email node

---

## 🐛 Troubleshooting

### No emails being sent?

**Check 1:** Verify unpaid invoices exist at those exact day markers
- Go to Simpro
- Check if any invoices were issued exactly 3, 7, 14, or 21 days ago
- Verify they're still unpaid

**Check 2:** Check IsPaid field
- Run PowerShell test: `.\test-invoice-followup.ps1`
- Verify unpaid invoices are detected

**Check 3:** Customer emails
- Check "Get Customer Details" node output
- Verify `Email` field is populated

**Check 4:** SMTP credentials
- Test email sending manually
- Check spam folder

### Emails sending to paid invoices?

**Check:** "Filter Unpaid Invoices" node output
- Should only show invoices with `IsPaid: false`
- If paid invoices appear, Simpro may not be updating `IsPaid` field

---

## 📊 Monitoring

### View Executions

1. Go to N8N → "Executions"
2. Filter by workflow: "Simpro Unpaid Invoice Follow-up"
3. Check daily runs:
   - Green checkmark = Success
   - Red X = Error
   - Click to see details

### Key Metrics to Track

- **Daily reminder volume:** How many reminders sent each day
- **Day 3 reminders:** Early engagement
- **Day 14+ reminders:** Problem accounts
- **Payment time:** Average days to payment after first reminder

---

## 📋 Pre-Launch Checklist

- [ ] Workflow imported to N8N
- [ ] "Fyrup Auth" credential linked
- [ ] SMTP credentials configured
- [ ] "From" email updated in all 4 Send Email nodes
- [ ] Currency symbols updated (£, $, €)
- [ ] Email templates reviewed and customized
- [ ] Tested with PowerShell script
- [ ] Verified unpaid invoices detected
- [ ] Verified customer emails retrieved
- [ ] Checked spam folder for test emails
- [ ] Workflow activated
- [ ] First execution monitored

---

## 🎯 Success Metrics

### Week 1
- Workflow runs daily without errors
- Reminders sent to correct customers
- No duplicate emails
- No emails to paid invoices

### Month 1
- Reduced days to payment
- Fewer overdue invoices
- Less manual follow-up work
- Improved cash flow

### Long-term
- Faster payment cycles
- Better customer payment behavior
- Automated collections process
- Reduced bad debt

---

## 💡 Tips for Success

### 1. Professional Tone
- Be firm but professional
- Escalate gradually (Day 3 → 21)
- Always provide payment options
- Include your contact info

### 2. Legal Compliance
- Review local debt collection laws
- Include required disclosures
- Respect payment terms
- Document all communications

### 3. Customer Relations
- Allow for payment timing issues
- Be understanding of genuine problems
- Offer payment plans if appropriate
- Don't burn bridges unnecessarily

### 4. Monitor Effectiveness
- Track payment rates after reminders
- Adjust timing if needed
- Refine messaging based on results
- A/B test different approaches

---

## 🚀 You're Ready!

**Your automated unpaid invoice follow-up system is complete and ready to deploy.**

### Next Steps:
1. Run PowerShell test first
2. Import workflow to N8N
3. Configure credentials
4. Update email addresses & currency
5. Test once manually
6. Activate and monitor

### Expected Result:
- Automatic payment reminders for all unpaid invoices
- Faster payment collection
- Better cash flow
- Reduced manual work

---

**Status:** ✅ **READY TO DEPLOY**

**Workflow File:** `simpro-invoice-followup-sequence.json`

💰 **Get paid faster with automated payment reminders!**
