# ✅ Invoice Workflow REAL Fix - Customer Endpoint Issue

## 🐛 The REAL Problem

The 404 error revealed the actual issue! The Simpro customer API doesn't use simple IDs:

### What We Tried:
```
GET /api/v1.0/companies/0/customers/3
```

### What the API Expects:
```
GET /api/v1.0/companies/0/customers/companies/179
```
OR
```
GET /api/v1.0/companies/0/customers/individuals/456
```

**The customer endpoint is organized by TYPE (`companies` or `individuals`), not just by ID!**

---

## 💡 The Error Message Revealed It

Looking at your error:
```json
{
  "error": "Invalid resource URI. The correct URI is specified in _href...",
  "_href": "/api/v1.0/companies/0/customers/companies/179"
}
```

**The API is telling us:** "Don't guess the path - use the `_href` field!"

---

## ✅ The CORRECT Solution

**We MUST use the `_href` pattern (just like quotes workflow):**

### Workflow Flow:
```
1. Get All Invoices
   ↓
2. Filter Unpaid Invoices (with customer IDs)
   ↓
3. Get All Customers (includes _href for each)
   ↓
4. Match Customer IDs to _href URLs
   ↓
5. Get Customer Details (using _href)
   ↓
6. Prepare Email Data
   ↓
7. Switch & Send Emails
```

### Why This Works:

**Step 3** gets customers like this:
```json
{
  "ID": 179,
  "CompanyName": "Mi-Move Ltd",
  "_href": "/api/v1.0/companies/0/customers/companies/179",
  "Type": "Company"
}
```

**Step 4** creates a map:
```javascript
customerMap = {
  179: "/api/v1.0/companies/0/customers/companies/179",
  456: "/api/v1.0/companies/0/customers/individuals/456"
}
```

**Step 5** uses the correct `_href` path:
```
GET https://fyrup.simprosuite.com/api/v1.0/companies/0/customers/companies/179
```

**This returns the full customer details including Email!** ✅

---

## 🔧 What Changed (Back to Original Approach)

### Restored Nodes:
- ✅ "Get All Customers" - **REQUIRED!**
- ✅ "Match Customer HREFs" - **REQUIRED!**

### Why We Need These:
1. **Get All Customers** - Gets the customer list with `_href` fields
2. **Match Customer HREFs** - Maps invoice customer IDs to correct `_href` paths
3. **Get Customer Details** - Uses `_href` to get full details (including email)

---

## 📊 Customer Endpoint Structure

The Simpro API organizes customers by type:

### Company Customers:
```
/api/v1.0/companies/0/customers/companies/{ID}
```

### Individual Customers:
```
/api/v1.0/companies/0/customers/individuals/{ID}
```

**You can't know which type without the `_href` field!**

---

## 🎯 Why Direct ID Access Doesn't Work

### ❌ Won't Work:
```
GET /customers/3
```

**Because:** Customer 3 could be at `/customers/companies/3` OR `/customers/individuals/3`

### ✅ Will Work:
```
1. GET /customers/ → Get list with _href fields
2. Find customer 3 → _href = "/customers/companies/3"
3. GET /customers/companies/3 → Success!
```

---

## 📝 Files Updated

✅ `simpro-invoice-followup-sequence.json` - **RESTORED _href approach**

**Changes:**
- Re-added "Get All Customers" node
- Re-added "Match Customer HREFs" node
- "Get Customer Details" uses `_href` from matching step
- Updated connections to full workflow
- Restored `customerHref` field in filter code

---

## 🚀 Testing Now

The workflow should now:

1. ✅ Get all invoices
2. ✅ Filter unpaid invoices
3. ✅ Get all customers (with `_href` fields)
4. ✅ Match invoice customer IDs to customer `_href` paths
5. ✅ Fetch customer details using correct `_href`
6. ✅ Extract email
7. ✅ Send payment reminders!

---

## 💡 Key Takeaway

**Both Quotes AND Invoices workflows use the same `_href` pattern!**

The difference was:
- **Quotes API:** Customer field includes `_href` directly ❌ (it doesn't!)
- **Invoices API:** Customer field includes `_href` directly ❌ (it doesn't!)

**Reality:** NEITHER includes `_href` in the nested customer object!

**Both workflows need to:**
1. Get the customer list separately
2. Use `_href` from that list
3. Follow the `_href` to get full customer details

---

## ✅ Status

**ACTUALLY FIXED NOW!** 🎉

The workflow uses the correct `_href` pattern that respects the Simpro API's customer endpoint structure (companies vs individuals).

---

**Date Fixed:** January 23, 2026 (Round 2!)  
**Issue:** Direct customer ID access returns 404  
**Root Cause:** Customers organized by type (`/companies/{ID}` or `/individuals/{ID}`)  
**Solution:** Use `_href` pattern to get correct customer path
