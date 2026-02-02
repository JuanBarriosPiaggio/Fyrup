# 🎉 READY TO TEST - All Configuration Complete!

## ✅ Your Complete Configuration

| Setting | Value |
|---------|-------|
| **Simpro Subdomain** | `fyrup` |
| **Company ID** | `0` |
| **API Token** | `c035c60b6a535c7f515627cd15fd76d4a7a25231` |
| **N8N Instance** | https://n8n.juanbp.com/ |
| **Complete API URL** | `https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/` |

---

## 🧪 TEST YOUR API NOW (Takes 30 seconds!)

### Option 1: PowerShell Test (Windows - Recommended)

1. Open PowerShell
2. Run these commands:

```powershell
cd "C:\Users\tree1\Desktop\Cursor\Fyrup"
.\test-simpro-api.ps1
```

**Expected Result**: You should see JSON data with quotes from Simpro!

### Option 2: Command Line Test

If you have `curl` installed, run this directly:

```bash
curl -X GET "https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/?pageSize=1" \
  -H "Authorization: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231" \
  -H "Content-Type: application/json"
```

---

## 🎯 If Test Succeeds → Set Up N8N!

Once the test script shows your quotes, follow these steps:

### 1. Create N8N Credential

In https://n8n.juanbp.com/:

- Go to **Credentials** → **+ Add Credential**
- Select **"Header Auth"**
- Fill in:
  ```
  Credential Name: Simpro API Token
  Header Name: Authorization
  Header Value: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
  ```
- Click **Save**

### 2. Import Workflow

- Go to **Workflows** → **Import from File**
- Select: `simpro-overdue-quotes-workflow-headerauth.json`

### 3. Update 3 HTTP Request Nodes

Update these URLs in the workflow:

**Node 1: "Get All Quotes from Simpro"**
```
https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/
```

**Node 2: "Get Contact Email"**
```
https://fyrup.simprosuite.com/api/v1.0/companies/0/contacts/{{$json.CustomerContact}}/
```

**Node 3: "Get Customer Email (Fallback)"**
```
https://fyrup.simprosuite.com/api/v1.0/companies/0/customers/{{$json.Customer}}/
```

For each node, select **Credential**: `Simpro API Token`

### 4. Configure Email (SMTP)

- Create SMTP credential with your email settings
- Update the "Send Overdue Email" node
- Set your "From" email address

### 5. Test & Go Live!

- Click **Execute Workflow** to test
- Once working, activate the workflow
- It will run daily at 9:00 AM automatically!

---

## 📋 Complete API Endpoints Reference

### Get All Quotes
```
GET https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/
Authorization: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
```

### Get Contact Details
```
GET https://fyrup.simprosuite.com/api/v1.0/companies/0/contacts/{contactId}/
Authorization: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
```

### Get Customer Details
```
GET https://fyrup.simprosuite.com/api/v1.0/companies/0/customers/{customerId}/
Authorization: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
```

---

## 📁 Files You Need

1. **Test Script**: `test-simpro-api.ps1` (Run this first!)
2. **N8N Workflow**: `simpro-overdue-quotes-workflow-headerauth.json`
3. **Full Instructions**: `YOUR-SETUP-INSTRUCTIONS.md`
4. **Quick Reference**: `QUICK-START.md`

---

## 🐛 Troubleshooting

### If test shows "401 Unauthorized"
- Token might be expired in Simpro
- Check if "Bearer " is included before the token

### If test shows "404 Not Found"
- Double-check Company ID is `0`
- Verify subdomain is `fyrup`

### If test shows "No quotes" or empty response
- Your API is working!
- You might just not have any quotes in the system yet

---

## 🚀 YOUR EXACT TEST COMMAND

Copy and paste this into PowerShell:

```powershell
cd "C:\Users\tree1\Desktop\Cursor\Fyrup" ; .\test-simpro-api.ps1
```

---

**Status**: ✅ Everything is configured and ready!

**Next Step**: Run the test script NOW!
