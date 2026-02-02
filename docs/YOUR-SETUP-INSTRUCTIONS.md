# Your Simpro N8N Setup Instructions

## ✅ Your Configuration Details

- **N8N Instance**: https://n8n.juanbp.com/
- **Simpro API Token**: `c035c60b6a535c7f515627cd15fd76d4a7a25231`
- **Workflow File**: `simpro-overdue-quotes-workflow-headerauth.json`

---

## 🚀 Step-by-Step Setup

### Step 1: Create Header Auth Credential in N8N

1. Open your N8N instance: https://n8n.juanbp.com/
2. Click on **Settings** (gear icon) or **Credentials** in the left menu
3. Click **+ Add Credential**
4. Search for **"Header Auth"**
5. Fill in exactly as shown:

```
Credential Name: Simpro API Token

Header Name: Authorization

Header Value: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
```

⚠️ **IMPORTANT**: Make sure you include "Bearer " (with a space) before the token!

6. Click **Save**

---

### Step 2: Your Simpro Company ID ✓

✅ **Your Company ID is: `0`**

---

### Step 3: Your Simpro Subdomain ✓

✅ **Your Simpro subdomain is: `fyrup`**

Your full Simpro URL: `https://fyrup.simprosuite.com`

---

### Step 4: Import Workflow into N8N

1. Go to https://n8n.juanbp.com/
2. Click **Workflows** in the left menu
3. Click **+ Add Workflow** or **Import**
4. Click the **⋮** (3 dots menu) at the top right
5. Select **Import from File**
6. Choose: `simpro-overdue-quotes-workflow-headerauth.json`
7. The workflow will open

---

### Step 5: Update HTTP Request Nodes (3 nodes to update)

You need to update **3 HTTP Request nodes** in the workflow:

#### Node 1: "Get All Quotes from Simpro"

1. Click on the node
2. In the **URL** field, replace:
   - `YOUR-COMPANY` → Your Simpro subdomain
   - `YOUR_COMPANY_ID` → Your Company ID

   **Your exact URL should be**: 
   ```
   https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/
   ```

3. Scroll down to **Credentials**
4. Select: **Simpro API Token** (the credential you created in Step 1)

#### Node 2: "Get Contact Email"

1. Click on the node
2. Update URL to: `https://fyrup.simprosuite.com/api/v1.0/companies/0/contacts/{{$json.CustomerContact}}/`
3. Select credential: **Simpro API Token**

#### Node 3: "Get Customer Email (Fallback)"

1. Click on the node
2. Update URL to: `https://fyrup.simprosuite.com/api/v1.0/companies/0/customers/{{$json.Customer}}/`
3. Select credential: **Simpro API Token**

---

### Step 6: Configure Email Settings

#### Create SMTP Credential:

1. Go to **Credentials** > **+ Add Credential**
2. Search for **"SMTP"**
3. Fill in your email server details:

```
Name: My Email Account

User: your-email@company.com
Password: your-email-password

Host: smtp.gmail.com (or your SMTP server)
Port: 587 (or 465 for SSL)

SSL/TLS: ✓ Enable
```

4. Click **Save**

#### Update Email Node:

1. In the workflow, click on **"Send Overdue Email"** node
2. Change **From Email** to your email address
3. Select your SMTP credential
4. Customize the email template if desired

---

### Step 7: Test the Workflow

#### Quick Test:

1. In the workflow, click on **Schedule Trigger - Daily 9AM** node
2. Right-click > **Disable** (for testing)
3. Add a **Manual Trigger** node at the start (or click **Test Workflow**)
4. Click **Execute Workflow** or **Execute Node**
5. Check each node:
   - ✅ Green = Success
   - ❌ Red = Error (click to see details)

#### Verify:

- [ ] Quotes are fetched from Simpro
- [ ] Overdue quotes are filtered correctly
- [ ] Contact emails are retrieved
- [ ] Test email is sent successfully

---

### Step 8: Go Live!

Once testing is successful:

1. Remove the Manual Trigger node (if added)
2. Enable the **Schedule Trigger - Daily 9AM** node
3. Click **Save** in the top right
4. Toggle the workflow to **Active** (switch at top right)

The workflow will now run automatically every day at 9:00 AM!

---

## 🔧 Quick Reference

### Your Authorization Header
```
Authorization: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
```

### Your Complete API Endpoint
```
https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/
```

### Test Your API Token with curl

Before setting up N8N, test if your token works:

```bash
curl -X GET "https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/?pageSize=1" \
  -H "Authorization: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231" \
  -H "Content-Type: application/json"
```

This command is ready to run as-is!

If this returns quote data, your token is working! 🎉

---

## ⚠️ Security Notes

- **Never share your API token** with anyone
- **Don't commit the token to Git** or version control
- Keep this file secure and delete it after setup if needed
- Consider rotating your token periodically in Simpro

---

## 🐛 Troubleshooting

### "401 Unauthorized"
- Check the token is correct: `c035c60b6a535c7f515627cd15fd76d4a7a25231`
- Ensure "Bearer " is before the token
- Verify the token hasn't expired in Simpro

### "No quotes returned"
- Check your Company ID is correct
- Verify your Simpro subdomain is correct
- Test the API endpoint with curl first

### "Email not sending"
- Verify SMTP credentials are correct
- Check if your email server allows automated emails
- Try sending a test email first

---

## 📞 Need Help?

- N8N Documentation: https://docs.n8n.io/
- Simpro API Documentation: https://developer.simprogroup.com/apidoc/
- Your N8N Instance: https://n8n.juanbp.com/

---

**Setup Date**: January 23, 2026

Good luck with your integration! 🚀
