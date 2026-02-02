# 🚀 START HERE - Quote Follow-up Automation

## ✅ What We Built (CORRECT VERSION!)

You wanted an **automated follow-up sequence** for active quotes, NOT overdue quote reminders.

### The Sequence:

```
Quote Issued (Day 0)
  ↓
Day 3: "How's everything looking?"
  ↓
Day 7: "Would you like to accept?"
  ↓
Day 14: "Still interested?"
  ↓
Day 21: "Final follow-up"
```

---

## 📁 Your Files

### 1. **Production Workflow** ⭐
`simpro-quote-followup-sequence.json`

- Runs daily at 9 AM
- 4 different email templates
- Sends emails to active quotes at exact day markers
- **USE THIS for production!**

### 2. **Test Workflow** 🧪
`simpro-quote-followup-TEST.json`

- Manual trigger (click to test)
- Shows which quotes would get emails
- NO emails sent (safe!)
- **TEST WITH THIS FIRST**

### 3. **Complete Guide** 📖
`QUOTE-FOLLOWUP-GUIDE.md`

- Full setup instructions
- Email template examples
- Troubleshooting
- Customization options

### 4. **PowerShell Test** 🔍
`test-quote-followup.ps1`

- Tests which quotes would trigger today
- Shows exact counts for each day (3, 7, 14, 21)
- Run this first to see expected volume

---

## 🎯 Quick Start (10 Minutes)

### Step 1: Test Current Data (2 min)

Run the PowerShell test to see what to expect:

```powershell
cd C:\Users\tree1\Desktop\Cursor\Fyrup
.\test-quote-followup.ps1
```

**This shows:**
- How many Day 3 emails would send today
- How many Day 7 emails would send today
- How many Day 14 emails would send today
- How many Day 21 emails would send today

### Step 2: Test in N8N (3 min)

1. Import: `simpro-quote-followup-TEST.json`
2. Click "Execute Workflow"
3. Check each node output
4. Verify quotes and emails look correct

### Step 3: Deploy Production (5 min)

1. Import: `simpro-quote-followup-sequence.json`
2. Link "Fyrup Auth" credential (should auto-link)
3. Configure SMTP credentials
4. Update "From" email in all 4 Send Email nodes
5. Activate workflow

**Done!** Workflow runs daily at 9 AM automatically.

---

## 📊 What to Expect

### Daily Volume

Typically **2-10 emails per day** depending on:
- How many quotes you issue daily
- How they spread across the day markers

### Example Day:

```
Today: January 23, 2026

Quotes issued on Jan 20 (3 days ago): 2 quotes → 2 Day 3 emails
Quotes issued on Jan 16 (7 days ago): 3 quotes → 3 Day 7 emails
Quotes issued on Jan 9 (14 days ago): 1 quote → 1 Day 14 email
Quotes issued on Jan 2 (21 days ago): 1 quote → 1 Day 21 email

Total emails today: 7
```

### Each Quote Gets:

Over its lifecycle, each active quote receives:
- **1 email at Day 3** (check-in)
- **1 email at Day 7** (acceptance prompt)
- **1 email at Day 14** (follow-up)
- **1 email at Day 21** (final reminder)

**Total: 4 emails per quote over 21 days**

---

## 🎨 Email Templates

### Day 3: Friendly Check-in
**Purpose:** Make sure they received it and have no questions  
**Tone:** Helpful, friendly  
**Call-to-action:** "Do you have any questions?"

### Day 7: Acceptance Prompt
**Purpose:** Encourage them to move forward  
**Tone:** Encouraging, action-oriented  
**Call-to-action:** "Would you like to accept this quote?"

### Day 14: Mid-point Follow-up
**Purpose:** Address concerns, re-engage  
**Tone:** Understanding, supportive  
**Call-to-action:** "Is there anything holding you back?"

### Day 21: Final Touch
**Purpose:** Last attempt, give them an out  
**Tone:** Professional, respectful  
**Call-to-action:** "Let me know if you want to close this out"

---

## ⚙️ How It Works (Technical)

### Smart Filtering

The workflow automatically:
- ✅ Gets ALL active quotes from Simpro
- ✅ Skips accepted/declined/completed quotes
- ✅ Calculates days since DateIssued
- ✅ Filters for EXACT day markers (3, 7, 14, 21)
- ✅ Gets customer emails via `_href` pattern
- ✅ Sends appropriate email template

### No Duplicates

Emails only send on **exact days**:
- Quote issued Jan 1
- Day 3 email: Jan 4 ✅
- Days 4-6: No emails ❌
- Day 7 email: Jan 8 ✅
- Days 8-13: No emails ❌
- Day 14 email: Jan 15 ✅
- Days 15-20: No emails ❌
- Day 21 email: Jan 22 ✅

---

## ⚠️ Important Notes

### 1. Status Filtering

Workflow automatically skips quotes with status:
- "Accepted" → Customer already said yes
- "Declined" → Customer already said no
- "Lost" → No longer pursuing
- "Completed" → Work already done

**Only active/open/pending quotes get follow-ups!**

### 2. Exact Day Matching

Follow-ups only send on EXACT days (3, 7, 14, 21).

**If you miss a day:**
- Workflow runs daily, so unlikely
- But if it happens, that follow-up is skipped
- Next marker will still trigger (e.g., Day 7 still sends even if Day 3 was missed)

### 3. Timing

- Runs daily at 9 AM (your server timezone)
- Dates calculated at midnight (00:00:00)
- Consistent across all quotes

---

## 🛠️ Customization

### Change Follow-up Days

Want 2, 5, 10, 20 instead of 3, 7, 14, 21?

**Edit:** "Filter Quotes for Follow-up" node  
**Change lines:**
```javascript
if (daysSinceIssued === 3) {  // Change to 2
if (daysSinceIssued === 7) {  // Change to 5
if (daysSinceIssued === 14) { // Change to 10
if (daysSinceIssued === 21) { // Change to 20
```

### Change Email Content

**Edit:** Each "Send Day X Email" node  
**Customize:**
- Subject line
- Email body
- Tone and messaging
- Call-to-action

### Change Schedule

**Edit:** "Schedule Trigger" node  
**Change cron expression:**
- 9 AM: `0 9 * * *`
- 2 PM: `0 14 * * *`
- Twice daily (9 AM & 5 PM): Use two triggers

---

## 📈 Success Metrics

### Week 1
- ✅ Workflow runs daily without errors
- ✅ Correct quotes selected (verify in executions)
- ✅ Emails sending successfully
- ✅ No customer complaints about duplicates

### Month 1
- ✅ Increased quote response rate
- ✅ Faster customer decisions
- ✅ Reduced manual follow-up work
- ✅ Better quote tracking

### Long Term
- ✅ Higher quote acceptance rate
- ✅ Shorter sales cycle
- ✅ Consistent customer engagement
- ✅ Automated sales nurture

---

## 🎉 You're Ready!

### Your Next Action:

**Option 1: Test First** (Recommended)
```powershell
1. Run: test-quote-followup.ps1
2. Import: simpro-quote-followup-TEST.json
3. Execute and verify
4. Then deploy production
```

**Option 2: Deploy Directly**
```
1. Import: simpro-quote-followup-sequence.json
2. Configure SMTP
3. Activate
```

---

## 📞 Need Help?

Check these in order:
1. `QUOTE-FOLLOWUP-GUIDE.md` - Full documentation
2. N8N Executions tab - See what's happening
3. PowerShell test - Verify quote data
4. Node outputs - Debug step-by-step

---

**Status:** ✅ **READY TO DEPLOY - CORRECT WORKFLOW!**

**Main File:** `simpro-quote-followup-sequence.json`

🎯 **Your quotes will now follow up automatically!**
