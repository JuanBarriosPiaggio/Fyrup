# Self-Hosted N8N Setup Guide for Simpro Integration

This guide is specifically for **self-hosted N8N instances** where OAuth2 API credential type may not be available.

## ✅ Use the Header Auth Version

**Import this file:** `simpro-overdue-quotes-workflow-headerauth.json`

This version uses **Header Auth** instead of OAuth2, which is more compatible with self-hosted N8N instances.

## 🔑 Step 1: Get Your Simpro API Token

### Method 1: Get Existing API Token from Simpro

1. Log into your Simpro account
2. Go to **Setup** > **System Setup** > **API** 
3. If you have an existing API token, copy it
4. If not, follow Method 2 to generate one

### Method 2: Generate New API Token

Contact Simpro support or your Simpro administrator to:
- Generate an API access token
- Ensure the token has permissions for:
  - Reading quotes
  - Reading contacts
  - Reading customers

**Important:** Save this token securely - you'll need it for N8N.

## 🔧 Step 2: Create Header Auth Credential in N8N

1. Open your N8N instance
2. Go to **Settings** (gear icon) > **Credentials**
3. Click **+ Add Credential**
4. Search for: **Header Auth**
5. Fill in the details:

```
Credential Name: Simpro API Token

Header Name: Authorization

Header Value: Bearer YOUR_SIMPRO_API_TOKEN
```

**Replace `YOUR_SIMPRO_API_TOKEN` with your actual token from Step 1**

6. Click **Save**
7. **Note the Credential ID** (you'll see it in the URL or credential list)

## 📥 Step 3: Import the Workflow

1. In N8N, click **Workflows** in the left sidebar
2. Click **+ Add Workflow** (or Import)
3. Click on the **3 dots menu** (top right) > **Import from File**
4. Select: `simpro-overdue-quotes-workflow-headerauth.json`
5. The workflow will open

## ⚙️ Step 4: Configure the Workflow

### Update All HTTP Request Nodes

You need to update **3 HTTP Request nodes**:

#### Node 1: "Get All Quotes from Simpro"
1. Click on the node
2. In the **URL** field, replace:
   - `YOUR-COMPANY` with your Simpro subdomain (e.g., `mycompany`)
   - `YOUR_COMPANY_ID` with your Company ID (e.g., `12345`)
3. In **Credentials** dropdown:
   - Select your "Simpro API Token" credential

**Example URL:**
```
https://mycompany.simprosuite.com/api/v1.0/companies/12345/quotes/
```

#### Node 2: "Get Contact Email"
1. Click on the node
2. Update the URL (same replacements as above)
3. Select your "Simpro API Token" credential

#### Node 3: "Get Customer Email (Fallback)"
1. Click on the node
2. Update the URL (same replacements as above)
3. Select your "Simpro API Token" credential

## 📧 Step 5: Configure Email Credentials

1. Go to **Settings** > **Credentials**
2. Click **+ Add Credential**
3. Search for: **SMTP**
4. Fill in your email server details:

```
Name: Email Account

User: your-email@company.com
Password: your-email-password (or app-specific password)

Host: smtp.gmail.com (or your SMTP server)
Port: 587 (or 465 for SSL)

SSL/TLS: Enable
```

5. Click **Save**

### Update the Email Node

1. In the workflow, click on **"Send Overdue Email"** node
2. Change **From Email** to your email address
3. Select your SMTP credential
4. Customize the email template if desired

## 🧪 Step 6: Test the Workflow

### Quick Test with Simple Workflow

1. Import `simpro-workflow-simple.json`
2. Update the URL and credentials
3. Click **Execute Workflow**
4. Check if quotes are fetched successfully

### Test the Full Workflow

1. In the main workflow, click on the **Schedule Trigger** node
2. Right-click > **Disable** (we'll test manually first)
3. Add a **Manual Trigger** node at the start
4. Click **Execute Workflow**
5. Check each node for results:
   - Green = Success
   - Red = Error (click to see details)

## 🚨 Common Issues & Solutions

### Issue: "401 Unauthorized" or "403 Forbidden"

**Solutions:**
- ✅ Verify your API token is correct
- ✅ Make sure token format is: `Bearer YOUR_TOKEN` (with "Bearer " prefix)
- ✅ Check token hasn't expired
- ✅ Verify token has correct permissions

### Issue: "Header Auth not found in credentials dropdown"

**Solutions:**
- ✅ Make sure you saved the Header Auth credential
- ✅ Try refreshing the N8N page
- ✅ Create the credential again if needed

### Issue: "Cannot find credential type"

**Solution:**
Instead of using saved credentials, you can add the header directly in each HTTP Request node:

1. In the HTTP Request node
2. Scroll to **Options** > **Add Option** > **Headers**
3. Add header:
   ```
   Name: Authorization
   Value: Bearer YOUR_API_TOKEN
   ```

### Issue: "No quotes returned"

**Solutions:**
- ✅ Check Company ID is correct (find in Simpro settings)
- ✅ Verify subdomain is correct
- ✅ Test the URL in Postman or browser first

### Issue: "Self-signed certificate" or "SSL error"

**Solution:**
In the HTTP Request node:
1. Scroll to **Options**
2. Add option: **Ignore SSL Issues**
3. Enable it

## 🔍 Finding Your Simpro Company ID

1. Log into Simpro
2. Look at the URL - it might show the Company ID
3. Or go to **Setup** > **System Setup** > **Company**
4. The Company ID should be visible there
5. It's usually a number like `12345` or `67890`

## 📝 Testing API Connection with curl

Test your token works before setting up N8N:

```bash
curl -X GET "https://YOUR-SUBDOMAIN.simprosuite.com/api/v1.0/companies/YOUR_COMPANY_ID/quotes/?pageSize=1" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

Replace:
- `YOUR-SUBDOMAIN` - your Simpro subdomain
- `YOUR_COMPANY_ID` - your Company ID  
- `YOUR_API_TOKEN` - your API token

If this returns quotes, your token is working!

## ✅ Final Checklist

- [ ] Got Simpro API token
- [ ] Created Header Auth credential in N8N
- [ ] Imported workflow (header auth version)
- [ ] Updated all 3 HTTP Request nodes with URLs
- [ ] Selected credentials in all HTTP nodes
- [ ] Created SMTP email credential
- [ ] Updated email node with sender address
- [ ] Tested workflow manually
- [ ] Verified quotes are fetched
- [ ] Confirmed emails are sent
- [ ] Enabled schedule trigger for production

## 🎯 Production Deployment

Once testing is successful:

1. Remove the Manual Trigger node
2. Enable the Schedule Trigger node
3. Activate the workflow (toggle at top right)
4. Monitor the first few executions
5. Check execution history regularly

## 📞 Need Help?

- Simpro API Documentation: https://developer.simprogroup.com/apidoc/
- N8N Documentation: https://docs.n8n.io/
- N8N Community Forum: https://community.n8n.io/

## 🔐 Security Best Practices

- ✅ Never share your API token
- ✅ Use environment variables for sensitive data
- ✅ Rotate tokens regularly
- ✅ Monitor API usage
- ✅ Keep N8N instance updated
