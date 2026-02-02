# 🔧 Workflow Fix - Missing DueDate Field

## ❌ The Problem

Your workflow stopped at the "Filter Overdue Quotes (7+ days)" node because **the quotes don't have a `DueDate` field**.

Looking at your API response, quotes only returned:
- `ID`
- `Description`
- `Total`

But the filter code needs:
- `DueDate` ← **MISSING!**
- `Customer` ← **MISSING!**

Without these fields, the filter skips all quotes and returns nothing.

---

## ✅ The Solution

Request specific columns from the Simpro API using the `columns` parameter.

### Updated URL:
```
OLD: https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/

NEW: https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/?columns=ID,Description,DueDate,Customer,CustomerContact,Total
```

---

## 🔧 How to Fix in N8N

### Option 1: Re-Import the Fixed Workflow

1. Delete the current workflow in N8N
2. Import the updated `simpro-overdue-quotes-WORKING.json` file (I just updated it)
3. Re-link your credentials
4. Test again

### Option 2: Manually Update the URL

1. Open your workflow in N8N
2. Click on the **"Get All Quotes from Simpro"** node
3. Change the URL to:
   ```
   https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/?columns=ID,Description,DueDate,Customer,CustomerContact,Total
   ```
4. Save the node
5. Execute the workflow to test

---

## 🧪 Test It First

Before re-importing to N8N, run this test script to verify the DueDate field is available:

```powershell
.\test-quotes-with-duedate.ps1
```

This will show you:
- ✅ If quotes have DueDate fields
- ✅ How many quotes are overdue by 7+ days
- ✅ The exact data the workflow will receive

---

## 📊 What You Should See

**Before (Current - Broken):**
```json
{
  "ID": 4032,
  "Description": "<div>...</div>",
  "Total": { "ExTax": 1275.58, "Tax": 255.12, "IncTax": 1530.7 }
}
```

**After (Fixed):**
```json
{
  "ID": 4032,
  "Description": "<div>...</div>",
  "DueDate": "2026-01-15T00:00:00+00:00",
  "Customer": 54,
  "CustomerContact": null,
  "Total": { "ExTax": 1275.58, "Tax": 255.12, "IncTax": 1530.7 }
}
```

---

## ⚠️ Important Notes

### If Quotes Don't Have Due Dates in Simpro

If the test shows quotes still don't have `DueDate` fields, it means:
1. The quotes in Simpro don't have due dates set
2. You need to add due dates in the Simpro UI first

**Where to set due dates in Simpro:**
- Go to the quote in Simpro
- Look for "Due Date" or "Expiry Date" field
- Set the date
- Save

### Alternative: Use Different Date Field

If Simpro uses a different field name (like `ExpiryDate`, `QuoteDate`, or `DateIssued`), you can:
1. Run the test to see what date fields are available
2. Update the filter code to use the correct field name

---

## 🎯 Next Steps

1. ✅ Run the test script: `.\test-quotes-with-duedate.ps1`
2. ✅ Verify DueDate field appears
3. ✅ Confirm some quotes are 7+ days overdue
4. ✅ Re-import the updated workflow OR manually update the URL
5. ✅ Test the workflow in N8N
6. ✅ Check that it progresses past the Filter node

---

## 🚀 Once Fixed

The workflow will:
1. ✅ Get quotes WITH DueDate field
2. ✅ Filter quotes overdue by 7+ days
3. ✅ Get customer list with _href
4. ✅ Follow _href to get customer emails
5. ✅ Send email reminders

---

**Status:** Fix applied to `simpro-overdue-quotes-WORKING.json`

**Test it:** `.\test-quotes-with-duedate.ps1`
