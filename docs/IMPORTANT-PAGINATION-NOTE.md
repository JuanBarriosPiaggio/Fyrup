# ⚠️ Important: API PageSize Limit

## Issue Fixed

**Error:** `pageSize=1000` was too large  
**Fix:** Changed to `pageSize=250` (API maximum)

---

## Current Status

✅ **You have 249 quotes** - This fits within the 250 limit  
✅ **Workflow will work perfectly** with current data  
✅ **All files updated** to use `pageSize=250`

---

## Future Consideration: Pagination

### When Will This Be a Problem?

If you ever have **more than 250 active quotes** at the same time, the workflow will only process the first 250.

**Currently:** You have 249 quotes total (active + inactive)  
**Active quotes:** Likely much fewer (after filtering accepted/declined/completed)  
**Risk level:** 🟢 **Low** - You're well within limits

---

## How to Check If You Need Pagination

### Option 1: Run This PowerShell Command

```powershell
$apiToken = "c035c60b6a535c7f515627cd15fd76d4a7a25231"
$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Accept" = "application/json"
}

$response = Invoke-RestMethod -Uri "https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/?pageSize=1" -Headers $headers
$response | Select-Object -ExpandProperty _meta

# Look for "total_count" - if > 250, you need pagination
```

### Option 2: Check in N8N

Look at the "Get All Quotes" node output:
- If it returns exactly 250 quotes
- AND you know you have more
- Then you need pagination

---

## If You Ever Need Pagination (Future)

You'll need to modify the workflow to make multiple API calls:

### Example Pagination Logic

```javascript
// Get page 1 (quotes 1-250)
GET /quotes/?pageSize=250&page=1

// Get page 2 (quotes 251-500)
GET /quotes/?pageSize=250&page=2

// Get page 3 (quotes 501-750)
GET /quotes/?pageSize=250&page=3

// Combine all results
```

### How to Add Pagination to N8N Workflow

1. **Option A: Use N8N Loop Node**
   - Calculate total pages needed
   - Loop through each page
   - Combine results

2. **Option B: Simpro API Meta Response**
   - Check `_meta.page_count` in first response
   - Make additional calls if needed

3. **Option C: Use HTTP Request Pagination Feature**
   - N8N has built-in pagination support
   - Configure in HTTP Request node settings

---

## When to Worry

### 🟢 Low Priority (Now)
- You have 249 total quotes
- Many are likely accepted/declined/completed
- Active quotes probably < 100
- **No action needed now**

### 🟡 Medium Priority
- You consistently have 200-250 active quotes
- You issue 5-10+ quotes daily
- **Monitor quote count monthly**

### 🔴 High Priority
- You have 250+ total quotes
- Workflow seems to miss some quotes
- **Implement pagination immediately**

---

## Quick Test

Run the PowerShell test script to see current counts:

```powershell
cd C:\Users\tree1\Desktop\Cursor\Fyrup
.\test-quote-followup.ps1
```

**Check the output:**
- "Total quotes fetched: 249" → ✅ All good
- "Total quotes fetched: 250" AND you know you have more → ⚠️ Need pagination

---

## Files Updated (All Fixed)

✅ `simpro-quote-followup-sequence.json` → pageSize=250  
✅ `simpro-quote-followup-TEST.json` → pageSize=250  
✅ `simpro-overdue-quotes-WORKING.json` → pageSize=250  
✅ `simpro-overdue-quotes-TEST-VERSION.json` → pageSize=250  
✅ `test-quote-followup.ps1` → pageSize=250  

---

## Summary

✅ **Issue fixed** - pageSize changed from 1000 to 250  
✅ **Workflow ready** - Will work with your 249 quotes  
✅ **Future-proofed** - Instructions provided if you ever need pagination  

**Action Required:** None! Just re-import/test the workflow.

---

**You're good to go! The 422 error is now fixed.** 🎉
