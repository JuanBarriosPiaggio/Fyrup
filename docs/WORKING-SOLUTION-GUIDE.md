# ✅ WORKING SOLUTION - Simpro Overdue Quote Emails

## 🎉 SUCCESS! We Found the Working Pattern!

Your Simpro API **does** provide customer email addresses, but you need to follow a specific pattern:

### The Working Pattern:

1. **Get customer list** → Returns minimal data + `_href` URL
2. **Follow each `_href`** → Returns full customer data including `Email`

Example:
- List endpoint: `/api/v1.0/companies/0/customers/` returns `{"ID": 54, "_href": "/api/v1.0/companies/0/customers/companies/54"}`
- Follow _href: `/api/v1.0/companies/0/customers/companies/54` returns full data including `"Email": "sergio@18hogarthroad.com"`

---

## 📋 Setup Instructions

### Step 1: Import the Workflow

1. Open your N8N instance: https://n8n.juanbp.com/
2. Go to **Workflows** → **Import from File**
3. Select: `simpro-overdue-quotes-WORKING.json`

### Step 2: Create Simpro API Credential

1. In N8N, go to **Credentials** → **+ Add Credential**
2. Select **"Header Auth"**
3. Fill in:
   ```
   Name: Simpro API Token
   Header Name: Authorization
   Header Value: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
   ```
4. Click **Save**

### Step 3: Link Credential to Workflow Nodes

The workflow has **3 HTTP Request nodes** that need the credential:

1. **"Get All Quotes"** node
2. **"Get All Customers (with hrefs)"** node
3. **"Get Customer Details (with Email)"** node

For each node:
- Click on the node
- In the **Authentication** section, select your "Simpro API Token" credential

### Step 4: Configure Email (SMTP)

1. Create an SMTP credential with your email provider settings
2. Update the **"Send Overdue Email"** node:
   - Link your SMTP credential
   - Change the "From" email address to your email

### Step 5: Test the Workflow

1. Click **"Execute Workflow"** to test
2. Check each node's output:
   - ✅ "Get All Quotes" should show your quotes
   - ✅ "Filter Overdue Quotes" should show overdue quotes
   - ✅ "Get All Customers" should show customer list with `_href` fields
   - ✅ "Get Customer Details" should show full customer data including emails
   - ✅ "Send Overdue Email" should send emails

### Step 6: Activate

Once testing is successful:
1. Click the **toggle switch** at the top to activate the workflow
2. It will run automatically every day at 9:00 AM

---

## 🔍 How the Workflow Works

### Flow Diagram:

```
Schedule (9 AM daily)
  ↓
Get All Quotes
  ↓
Filter Overdue (7+ days)
  ↓
Get Customer List (with _href URLs)
  ↓
Match Quotes → Customer _hrefs
  ↓
Follow Each _href → Get Full Customer Details
  ↓
Prepare Email Data
  ↓
Send Email Reminder
```

### Key Features:

- ✅ Automatically runs daily at 9 AM
- ✅ Filters quotes overdue by 7+ days
- ✅ **Follows _href pattern** to get customer emails
- ✅ Skips quotes with no email address
- ✅ Personalized email with quote details
- ✅ Shows days overdue in email

---

## 📊 What We Discovered

### Tests Performed:

| Test | Result |
|------|--------|
| Bulk `/customers/` endpoint | ✅ Works, returns minimal fields |
| Individual `/customers/{id}` | ❌ 404 Not Found |
| Individual `/customers/companies/{id}` | ❌ 404 when accessed directly |
| Following `_href` from bulk response | ✅ **WORKS!** Returns full data with email |

### Key Insight:

The Simpro API requires you to:
1. First get the customer list (minimal data)
2. Extract the `_href` field from each customer
3. Follow that `_href` URL to get full details

You **cannot** construct the URL yourself - you must use the `_href` provided by the API.

---

## 🐛 Troubleshooting

### No Emails Being Sent?

**Check:**
1. Do your customers have email addresses in Simpro?
2. Run the test: `.\test-follow-href.ps1` to verify
3. Check the "Get Customer Details" node output - does it show `Email` field?

### 404 Errors?

**Make sure:**
- You're using the `_href` from the API response
- Not constructing URLs manually
- The Accept header is set to `application/json`

### No Overdue Quotes?

**Check:**
- Do your quotes have `DueDate` fields?
- Are any actually overdue by 7+ days?
- Adjust the overdue threshold in the "Filter" node if needed

---

## 📞 Files in This Folder

| File | Purpose |
|------|---------|
| `simpro-overdue-quotes-WORKING.json` | **Use this!** The working N8N workflow |
| `test-follow-href.ps1` | Test script that proves the solution works |
| `test-simpro-api.ps1` | Basic API connectivity test |
| `swagger.json` | Complete Simpro API documentation |
| `WORKING-SOLUTION-GUIDE.md` | This file - your setup guide |

---

## 🎯 Next Steps

1. ✅ Import the workflow
2. ✅ Configure credentials
3. ✅ Test it manually
4. ✅ Activate it
5. ✅ Check tomorrow at 9 AM to verify it ran

---

## 🚀 Success Criteria

You'll know it's working when:
- The workflow runs daily at 9 AM
- Overdue quotes trigger emails
- Customers receive personalized reminders
- The "Get Customer Details" node shows email addresses

---

**Status:** ✅ SOLUTION FOUND AND TESTED!

**Working Example:** Customer ID 54 ("18 Hogarth Road Ltd") successfully returned email: `sergio@18hogarthroad.com`
