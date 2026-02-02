# 🎯 Quote Follow-up Automation - Complete Guide

## What This Does

**Automatically sends follow-up emails to customers at specific intervals after a quote is issued.**

This is NOT about expired/overdue quotes. This is about nurturing active quotes through a follow-up sequence.

---

## 📧 The Follow-up Sequence

### Day 3 After Quote Issued
**Subject:** Quick Check-in on Quote #[ID]  
**Purpose:** Check if they have questions  
**Tone:** Friendly, helpful

### Day 7 After Quote Issued
**Subject:** Ready to Move Forward? Quote #[ID]  
**Purpose:** Prompt them to accept  
**Tone:** Encouraging, action-oriented

### Day 14 After Quote Issued
**Subject:** Following Up - Quote #[ID]  
**Purpose:** Address any concerns  
**Tone:** Understanding, supportive

### Day 21 After Quote Issued
**Subject:** Final Follow-up on Quote #[ID]  
**Purpose:** Last touchpoint  
**Tone:** Professional, closing

---

## 🎯 How It Works

```
Daily Schedule (9 AM)
  ↓
Get ALL Active Quotes
  → Status: Open/Pending (NOT accepted/declined/completed)
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
Send Appropriate Email
  → Day 3, 7, 14, or 21 template
```

---

## ✅ Key Features

### Smart Filtering
- Only processes **active** quotes (not accepted/declined/completed)
- Sends emails on **exact day markers** (3, 7, 14, 21)
- Runs daily, so no quotes are missed

### No Duplicate Emails
- Once a quote is 3 days old, it gets Day 3 email
- Next day (4 days old), no email
- Day 7, it gets Day 7 email
- And so on...

### Customer Email Retrieval
- Uses the proven `_href` pattern
- Gets full customer details including Email
- Skips quotes with no customer email

---

## 📁 Files

### Production: `simpro-quote-followup-sequence.json`

**This is your main workflow!**

✅ Schedule trigger (9 AM daily)  
✅ 4 different email templates  
✅ Smart filtering by quote status  
✅ Exact day matching (3, 7, 14, 21)  

---

## 🚀 Setup Instructions (10 Minutes)

### Step 1: Import Workflow

1. Open N8N: https://n8n.juanbp.com/
2. Click "+" → "Import from File"
3. Select: `simpro-quote-followup-sequence.json`
4. Click "Import"

### Step 2: Link Credentials

**Simpro API (Already Done)**
- All HTTP Request nodes use: "Fyrup Auth"
- Should auto-link to your existing credential
- Test: Click on "Get All Quotes" node → "Test step"

**SMTP (Email Sending)**
- Click on "Send Day 3 Email" node
- Click "Credential for Sending Email"
- Select your SMTP account or create new one

### Step 3: Update Email Addresses

**For ALL 4 Send Email nodes:**

1. **Send Day 3 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   
2. **Send Day 7 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   
3. **Send Day 14 Email**
   - Change "From" email: `your-email@example.com` → Your actual email
   
4. **Send Day 21 Email**
   - Change "From" email: `your-email@example.com` → Your actual email

### Step 4: Customize Email Templates (Optional)

Each email template can be customized in the "message" field of each Send Email node.

**Available variables:**
- `{{ $json.customerName }}` - Customer name
- `{{ $json.quoteID }}` - Quote ID
- `{{ $json.dateIssued }}` - When quote was issued
- `{{ $json.daysSinceIssued }}` - Days since issued
- `{{ $json.description }}` - Quote description
- `{{ $json.total.IncTax }}` - Total amount

### Step 5: Test First (Recommended)

**Test with Manual Trigger:**

1. Temporarily change "Schedule Trigger" to "Manual Trigger"
2. Click "Execute Workflow"
3. Check each node's output
4. Verify correct quotes are selected
5. Check if emails would be sent to right customers

**Test with Current Data:**
```
Today's Date: January 23, 2026

Will trigger emails for quotes issued on:
- Day 3: Issued on January 20, 2026
- Day 7: Issued on January 16, 2026
- Day 14: Issued on January 9, 2026
- Day 21: Issued on January 2, 2026
```

### Step 6: Activate

1. Click "Active" toggle (top right)
2. Workflow will run daily at 9 AM
3. Monitor executions in "Executions" tab

---

## 📊 What to Expect

### First Day Results

Based on your 249 quotes, on the first day you might send:
- **~3-5 Day 3 emails** (quotes issued 3 days ago)
- **~3-5 Day 7 emails** (quotes issued 7 days ago)
- **~3-5 Day 14 emails** (quotes issued 14 days ago)
- **~3-5 Day 21 emails** (quotes issued 21 days ago)

**Total first day:** ~12-20 emails (depending on quote distribution)

### Ongoing Daily Volume

- Typically **2-8 emails per day**
- Depends on how many quotes you issue daily
- Each quote gets exactly 4 emails over 21 days

---

## ⚠️ Important Notes

### Quote Status Filtering

The workflow **automatically skips** quotes with these statuses:
- Accepted
- Declined
- Lost
- Completed

**Why?** No need to follow up if customer already responded!

### Exact Day Matching

Emails only send on **exact days** (3, 7, 14, 21).

**Example:**
- Quote issued: January 1
- Day 3 email: January 4 ✅
- Day 4: No email ❌
- Day 5: No email ❌
- Day 6: No email ❌
- Day 7 email: January 8 ✅

### Time Zone

- Workflow runs at 9 AM in your N8N server's timezone
- Dates calculated at midnight (00:00:00)
- Consistent across all quotes

---

## 📧 Email Template Examples

### Day 3 Email (Check-in)

**Subject:** Quick Check-in on Quote #4032

**Body:**
```
Hi ABC Company,

I wanted to quickly check in on the quote we sent you a few days ago.

Quote Details:
• Quote ID: 4032
• Date Issued: 2026-01-20

Do you have any questions or need any clarification? I'm here to help!

Best regards,
Your Team
```

### Day 7 Email (Acceptance Prompt)

**Subject:** Ready to Move Forward? Quote #4032

**Body:**
```
Hi ABC Company,

It's been a week since we sent over your quote. We'd love to help you get started!

Quote Details:
• Quote ID: 4032
• Date Issued: 2026-01-20

Would you like to accept this quote and move forward?

If you have any questions or concerns, please don't hesitate to reach out.

Best regards,
Your Team
```

### Day 14 Email (Follow-up)

**Subject:** Following Up - Quote #4032

**Body:**
```
Hi ABC Company,

I wanted to follow up on the quote we sent you two weeks ago.

Quote Details:
• Quote ID: 4032
• Date Issued: 2026-01-20

Are you still interested? Is there anything holding you back that I can help address?

Best regards,
Your Team
```

### Day 21 Email (Final Follow-up)

**Subject:** Final Follow-up on Quote #4032

**Body:**
```
Hi ABC Company,

This is my final follow-up regarding the quote we sent you three weeks ago.

Quote Details:
• Quote ID: 4032
• Date Issued: 2026-01-20

If you're no longer interested, that's absolutely fine - just let me know so I can close this out.

Otherwise, I'm here whenever you're ready to move forward!

Best regards,
Your Team
```

---

## 🔧 Customization Options

### Change Follow-up Days

To change from 3, 7, 14, 21 to different days:

1. Go to "Filter Quotes for Follow-up" node
2. Edit the JavaScript code
3. Change lines:
   ```javascript
   if (daysSinceIssued === 3) {  // Change 3 to your desired day
   if (daysSinceIssued === 7) {  // Change 7 to your desired day
   if (daysSinceIssued === 14) { // Change 14 to your desired day
   if (daysSinceIssued === 21) { // Change 21 to your desired day
   ```

### Add More Follow-ups

To add Day 30, Day 60, etc:

1. Add condition in "Filter Quotes for Follow-up" node
2. Update "Switch by Follow-up Day" node with new output
3. Add new "Send Email" node with Day 30 template
4. Connect switch output to new email node

### Change Email Schedule

To run at different time (e.g., 2 PM):

1. Click "Schedule Trigger" node
2. Change cron expression:
   - 9 AM: `0 9 * * *`
   - 2 PM: `0 14 * * *`
   - 6 PM: `0 18 * * *`

---

## 🐛 Troubleshooting

### No emails being sent?

**Check 1:** Verify quotes exist at those exact day markers
- Go to Simpro
- Check if any quotes were issued exactly 3, 7, 14, or 21 days ago

**Check 2:** Check quote Status field
- Workflow skips accepted/declined/completed quotes
- Verify your quotes are still "Open" or "Pending"

**Check 3:** Customer emails
- Check "Get Customer Details" node output
- Verify `Email` field is populated

**Check 4:** SMTP credentials
- Test email sending manually
- Check spam folder

### Wrong quotes being selected?

**Check:** "Filter Quotes for Follow-up" node output
- Should show `followUpType: 'day3'` etc
- Should show `daysSinceIssued: 3` etc
- Verify date calculation is correct

### Duplicate emails?

**Shouldn't happen** because:
- Workflow runs daily
- Only matches exact days (3, 7, 14, 21)
- Each quote only hits each day marker once

**If happening:**
- Check if workflow is running multiple times per day
- Check "Schedule Trigger" settings

---

## 📊 Monitoring

### View Executions

1. Go to N8N → "Executions"
2. Filter by workflow: "Simpro Quote Follow-up Sequence"
3. Check daily runs:
   - Green checkmark = Success
   - Red X = Error
   - Click to see details

### Key Metrics to Track

- **Daily email volume:** How many follow-ups sent each day
- **Day 3 emails:** Early engagement
- **Day 7 emails:** Conversion prompts
- **Day 21 emails:** Last touchpoints
- **Success rate:** Emails sent vs. errors

---

## 📋 Pre-Launch Checklist

- [ ] Workflow imported to N8N
- [ ] "Fyrup Auth" credential linked
- [ ] SMTP credentials configured
- [ ] "From" email updated in all 4 Send Email nodes
- [ ] Email templates customized (optional)
- [ ] Tested with manual trigger
- [ ] Verified correct quotes selected (3, 7, 14, 21 days)
- [ ] Verified customer emails retrieved
- [ ] Checked spam folder for test emails
- [ ] Workflow activated
- [ ] First execution monitored

---

## 🎯 Success Metrics

### Week 1
- Workflow runs daily without errors
- Emails sent to correct customers
- No duplicate emails
- Customers receiving and reading emails

### Month 1
- Increased quote acceptance rate
- Faster response times from customers
- Reduced manual follow-up work
- Clear tracking of quote lifecycle

### Long-term
- Higher quote-to-sale conversion
- Better customer engagement
- Automated nurture sequence
- More consistent follow-up process

---

## 💡 Tips for Success

### 1. Personalize Email Templates
- Use customer names
- Reference specific quote details
- Mention project specifics
- Add personalized sign-off

### 2. Test Email Deliverability
- Send test emails to yourself first
- Check spam folder
- Use professional "From" address
- Include unsubscribe option if needed

### 3. Monitor Customer Responses
- Check which emails get most replies
- Adjust timing if needed
- Refine messaging based on feedback
- Track which day gets best conversion

### 4. A/B Test Email Content
- Try different subject lines
- Test formal vs. casual tone
- Experiment with urgency levels
- Measure open and response rates

---

## 🚀 You're Ready!

**Your automated quote follow-up system is complete and ready to deploy.**

### Next Steps:
1. Import workflow
2. Configure credentials
3. Update email addresses
4. Test once manually
5. Activate and monitor

### Expected Result:
- Consistent, timely follow-ups on every quote
- Increased customer engagement
- Higher quote acceptance rates
- Zero manual effort

---

**Status:** ✅ **READY TO DEPLOY**

**Workflow File:** `simpro-quote-followup-sequence.json`

🎉 **Your quotes will now automatically nurture themselves!**
