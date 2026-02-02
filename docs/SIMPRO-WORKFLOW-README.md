# Simpro Overdue Quotes N8N Workflow

This N8N workflow automatically checks for overdue quotes in your Simpro system and sends email reminders to customers whose payments are 7+ days overdue.

## 📋 Features

- ✅ Automatically fetches all quotes from Simpro API
- ✅ Identifies quotes overdue by 7+ days (customizable)
- ✅ Retrieves customer contact email addresses
- ✅ Sends professional HTML email reminders
- ✅ Runs on a daily schedule (customizable)
- ✅ Handles missing emails gracefully
- ✅ Includes fallback from contact to customer email

## 🚀 Quick Start

### 1. Import the Workflow

1. Open your N8N instance
2. Click on **Workflows** > **Import from File**
3. Select `simpro-overdue-quotes-workflow.json`
4. The workflow will be imported with all nodes configured

### 2. Configure Simpro API Credentials

#### Option A: Header Auth (Recommended for Self-Hosted N8N)

1. First, get your Simpro API access token:
   - Log into your Simpro account
   - Go to **Setup** > **System Setup** > **API**
   - Generate an API access token
   - Copy and save this token securely

2. In N8N, go to **Credentials** > **New Credential**
3. Search for and select **Header Auth**
4. Fill in the following details:

   ```
   Name: Simpro API Token
   Header Name: Authorization
   Header Value: Bearer YOUR_ACCESS_TOKEN
   ```
   
   Replace `YOUR_ACCESS_TOKEN` with your actual Simpro token

5. Click **Save**

#### Option B: OAuth2 (If Available)

If your N8N instance has OAuth2 support:

1. In N8N, go to **Credentials** > **New Credential**
2. Look for **OAuth2 API** or **Generic OAuth2**
3. Fill in the following details:

   ```
   Name: Simpro OAuth2
   Grant Type: Authorization Code
   Authorization URL: https://YOUR-COMPANY.simprosuite.com/oauth/authorize
   Access Token URL: https://YOUR-COMPANY.simprosuite.com/oauth/token
   Client ID: [Your Simpro Client ID]
   Client Secret: [Your Simpro Client Secret]
   ```

4. Save the credential

#### Get Your Simpro API Credentials:

- Documentation: https://developer.simprogroup.com/apidoc/#section/Authenticating-your-application
- Contact Simpro support if you need help generating tokens

### 3. Update Workflow Configuration

Open the workflow and update the following in each HTTP Request node:

#### In "Get All Quotes from Simpro" node:
```
URL: https://YOUR-COMPANY.simprosuite.com/api/v1.0/companies/YOUR_COMPANY_ID/quotes/
Credentials: Select your "Simpro OAuth2" credential
```

#### In "Get Contact Email" node:
```
URL: https://YOUR-COMPANY.simprosuite.com/api/v1.0/companies/YOUR_COMPANY_ID/contacts/{{ $json.contactId }}
Credentials: Select your "Simpro OAuth2" credential
```

#### In "Get Customer Email (Fallback)" node:
```
URL: https://YOUR-COMPANY.simprosuite.com/api/v1.0/companies/YOUR_COMPANY_ID/customers/{{ $json.customerId }}
Credentials: Select your "Simpro OAuth2" credential
```

**Replace:**
- `YOUR-COMPANY` with your Simpro subdomain (e.g., `mycompany`)
- `YOUR_COMPANY_ID` with your actual Company ID (usually a number like `12345`)

### 4. Configure Email Settings

1. Go to **Credentials** > **New Credential**
2. Select **SMTP**
3. Fill in your email server details:

   ```
   Name: SMTP Account
   User: your-email@your-company.com
   Password: [Your email password or app password]
   Host: smtp.your-provider.com
   Port: 587 (or 465 for SSL)
   SSL/TLS: Yes
   ```

4. In the "Send Overdue Email" node:
   - Update the **From Email** address
   - Customize the email template if needed
   - Select your SMTP credential

### 5. Customize Settings (Optional)

#### Change Overdue Threshold:

In the "Filter Overdue Quotes (7+ Days)" node, modify this line:
```javascript
const daysThreshold = 7; // Change to 14 for 14 days, etc.
```

#### Adjust Schedule:

In the "Schedule Trigger - Daily 9AM" node:
- Current: `0 9 * * *` (Daily at 9:00 AM)
- Change to: `0 14 * * *` (Daily at 2:00 PM)
- Or: `0 9 * * 1` (Every Monday at 9:00 AM)

#### Customize Email Template:

In the "Send Overdue Email" node, edit the HTML message field to match your company branding.

## 📊 Workflow Logic

```
┌─────────────────────────────┐
│  Schedule Trigger (Daily)   │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│   Get All Quotes (Simpro)   │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Filter Overdue (7+ Days)   │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Check Contact ID Exists?   │
└──────┬──────────────┬───────┘
       │              │
    YES│              │NO
       ▼              ▼
┌──────────────┐  ┌──────────────┐
│Get Contact   │  │Get Customer  │
│Email         │  │Email         │
└──────┬───────┘  └──────┬───────┘
       │                 │
       └────────┬────────┘
                ▼
┌─────────────────────────────┐
│  Merge Quote & Email Data   │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│   Verify Email Exists?      │
└─────────────┬───────────────┘
              │ YES
              ▼
┌─────────────────────────────┐
│   Send Overdue Email        │
└─────────────────────────────┘
```

## 🧪 Testing the Workflow

### Test Mode:

1. **Disable the Schedule Trigger** temporarily
2. **Add a Manual Trigger** node at the start
3. **Modify the filter code** to test with a smaller threshold:
   ```javascript
   const daysThreshold = 0; // This will catch all quotes past due date
   ```
4. Click **Execute Workflow** to test
5. Check the execution log for any errors
6. Verify that emails are sent correctly

### Verify API Responses:

- Click on each node after execution to see the data
- Check that quotes are being fetched correctly
- Verify email addresses are being retrieved
- Ensure the filter logic is working as expected

## 📝 Important Notes

### Email Addresses:

The Simpro Quotes API doesn't include email addresses by default. This workflow makes additional API calls to fetch contact/customer details to get email addresses. This means:

- **More API calls** = Check your API rate limits
- **Slower execution** = Each quote requires an additional API call

### API Rate Limits:

- Check Simpro's API documentation for rate limits
- Consider adding **delay nodes** if you have many overdue quotes
- You may want to process quotes in batches

### Pagination:

- Current limit: 250 quotes per request
- If you have more than 250 quotes, you'll need to implement pagination
- Add a loop to fetch multiple pages

## 🔧 Troubleshooting

### Issue: "Authentication failed"
**Solution:** 
- Verify your OAuth2 credentials are correct
- Check that your Simpro API application is approved
- Ensure the access token hasn't expired

### Issue: "No quotes returned"
**Solution:**
- Check the Company ID is correct
- Verify the API URL is correct
- Test the API endpoint directly using Postman

### Issue: "Email not found"
**Solution:**
- Verify that contacts/customers have email addresses in Simpro
- Check the email field name (might be `Email`, `EmailAddress`, or `email`)
- Add logging to see what data is being returned

### Issue: "Emails not sending"
**Solution:**
- Verify SMTP credentials are correct
- Check your email server allows automated emails
- Test sending a simple email first
- Check spam folders

## 📚 Additional Resources

- [Simpro API Documentation](https://developer.simprogroup.com/apidoc/)
- [N8N Documentation](https://docs.n8n.io/)
- [OAuth2 Setup Guide](https://developer.simprogroup.com/apidoc/#section/Authenticating-your-application)

## 🆘 Support

If you need help:
1. Check the N8N execution logs for detailed error messages
2. Review the Simpro API documentation
3. Test API endpoints independently using Postman or curl
4. Check the N8N community forum

## 📄 License

This workflow is provided as-is for your use with Simpro and N8N.

## ⚠️ Disclaimer

- Test thoroughly before using in production
- Ensure compliance with your email sending policies
- Monitor API usage to avoid rate limits
- Keep credentials secure and never commit them to version control
