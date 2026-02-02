# Simpro N8N Workflow - Configuration Checklist

Use this checklist to ensure you have everything configured correctly before running the workflow.

## ☑️ Prerequisites

### Simpro Account Information

- [ ] **Simpro Subdomain**: `_________________________` 
  - Example: If your URL is `mycompany.simprosuite.com`, your subdomain is `mycompany`

- [ ] **Company ID**: `_________________________`
  - Find this in Simpro under Setup > System Setup
  - Usually a number like `12345`

- [ ] **OAuth2 Client ID**: `_________________________`
  - Register your application at: https://developer.simprogroup.com/apidoc/#section/Registering-your-application

- [ ] **OAuth2 Client Secret**: `_________________________`
  - Keep this secret and secure!

### Email Account Information

- [ ] **SMTP Host**: `_________________________`
  - Example: `smtp.gmail.com`, `smtp.office365.com`

- [ ] **SMTP Port**: `_________________________`
  - Common: 587 (TLS) or 465 (SSL)

- [ ] **Email Address**: `_________________________`
  - The email that will send reminders

- [ ] **Email Password/App Password**: `_________________________`
  - Use an app-specific password if using Gmail/Office 365

## ☑️ N8N Configuration Steps

### Step 1: Import Workflow

- [ ] Downloaded `simpro-overdue-quotes-workflow.json`
- [ ] Imported into N8N
- [ ] Workflow appears in your workflows list

### Step 2: Configure Simpro OAuth2 Credentials

- [ ] Created new OAuth2 API credential in N8N
- [ ] Set **Authorization URL**: `https://YOUR-SUBDOMAIN.simprosuite.com/oauth/authorize`
- [ ] Set **Access Token URL**: `https://YOUR-SUBDOMAIN.simprosuite.com/oauth/token`
- [ ] Entered Client ID
- [ ] Entered Client Secret
- [ ] Tested connection (should show "Connected")
- [ ] Noted the Credential ID

### Step 3: Configure SMTP Email Credentials

- [ ] Created new SMTP credential in N8N
- [ ] Entered SMTP host
- [ ] Entered SMTP port
- [ ] Entered email address
- [ ] Entered password
- [ ] Enabled SSL/TLS
- [ ] Tested connection

### Step 4: Update HTTP Request Nodes

#### "Get All Quotes from Simpro" Node:
- [ ] Updated URL with your subdomain: `https://YOUR-SUBDOMAIN.simprosuite.com/...`
- [ ] Updated URL with your Company ID: `.../companies/YOUR-COMPANY-ID/quotes/`
- [ ] Selected OAuth2 credential
- [ ] Full URL: `_________________________________________________`

#### "Get Contact Email" Node:
- [ ] Updated URL with your subdomain
- [ ] Updated URL with your Company ID
- [ ] Selected OAuth2 credential
- [ ] Full URL: `_________________________________________________`

#### "Get Customer Email (Fallback)" Node:
- [ ] Updated URL with your subdomain
- [ ] Updated URL with your Company ID
- [ ] Selected OAuth2 credential
- [ ] Full URL: `_________________________________________________`

### Step 5: Configure Email Node

- [ ] Updated **From Email** address in "Send Overdue Email" node
- [ ] Selected SMTP credential
- [ ] Customized email template (optional)
- [ ] Updated company name in email footer
- [ ] Updated contact information in email footer

### Step 6: Adjust Settings (Optional)

- [ ] Modified overdue threshold (default: 7 days)
- [ ] Adjusted schedule trigger (default: Daily 9 AM)
- [ ] Customized email HTML template
- [ ] Added company logo to email (if desired)

## ☑️ Testing

### Pre-Production Testing

- [ ] **Test API Connection**:
  - [ ] Import `simpro-workflow-simple.json`
  - [ ] Execute and verify quotes are fetched
  - [ ] Check data structure in "Inspect Data" node

- [ ] **Test with Manual Trigger**:
  - [ ] Disable Schedule Trigger in main workflow
  - [ ] Add Manual Trigger node
  - [ ] Set overdue threshold to 0 (catches all overdue quotes)
  - [ ] Execute workflow manually
  - [ ] Verify quotes are filtered correctly

- [ ] **Test Email Sending**:
  - [ ] Replace recipient email with your test email
  - [ ] Execute workflow
  - [ ] Check inbox for test email
  - [ ] Verify email formatting looks correct
  - [ ] Check spam folder if not received

- [ ] **Test Contact Email Lookup**:
  - [ ] Verify contact IDs are being retrieved
  - [ ] Check email addresses are being fetched
  - [ ] Confirm fallback to customer email works

### Production Checklist

- [ ] **Remove test configurations**:
  - [ ] Removed Manual Trigger (if added)
  - [ ] Set overdue threshold back to 7 days
  - [ ] Restored original recipient email (from data, not hardcoded)

- [ ] **Verify Schedule**:
  - [ ] Schedule Trigger is enabled
  - [ ] Cron expression is correct
  - [ ] Timezone is configured correctly

- [ ] **Enable Workflow**:
  - [ ] Activated workflow in N8N
  - [ ] Set to active status

## ☑️ Monitoring

### First Week Monitoring

- [ ] Check workflow execution logs daily
- [ ] Verify emails are being sent
- [ ] Monitor API rate limits
- [ ] Check for any error messages
- [ ] Confirm recipients are receiving emails
- [ ] Verify no false positives (already paid quotes)

## 📋 Quick Reference URLs

Replace these with your actual values:

```
Base API URL: https://YOUR-SUBDOMAIN.simprosuite.com/api/v1.0

Quotes Endpoint: /companies/YOUR-COMPANY-ID/quotes/

Contacts Endpoint: /companies/YOUR-COMPANY-ID/contacts/{contactId}

Customers Endpoint: /companies/YOUR-COMPANY-ID/customers/{customerId}
```

## 🔍 Verification Commands

Test your Simpro API using curl (replace placeholders):

```bash
# Test getting quotes
curl -X GET "https://YOUR-SUBDOMAIN.simprosuite.com/api/v1.0/companies/YOUR-COMPANY-ID/quotes/?pageSize=1" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"

# Test getting a contact
curl -X GET "https://YOUR-SUBDOMAIN.simprosuite.com/api/v1.0/companies/YOUR-COMPANY-ID/contacts/CONTACT_ID" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

## 📞 Support Resources

- [ ] Bookmarked Simpro API Docs: https://developer.simprogroup.com/apidoc/
- [ ] Bookmarked N8N Documentation: https://docs.n8n.io/
- [ ] Joined N8N Community Forum: https://community.n8n.io/
- [ ] Have Simpro support contact information

## 🎯 Success Criteria

Your workflow is successfully configured when:

✅ Manual execution completes without errors  
✅ Overdue quotes are correctly identified  
✅ Customer emails are retrieved successfully  
✅ Reminder emails are sent and received  
✅ Email formatting looks professional  
✅ Schedule trigger runs automatically  
✅ No API rate limit errors  

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "401 Unauthorized" | Check OAuth2 credentials, may need to reauthorize |
| "No quotes returned" | Verify Company ID is correct |
| "Email not found" | Check that contacts have email addresses in Simpro |
| "SMTP connection failed" | Verify SMTP credentials and port settings |
| "Rate limit exceeded" | Add delay between API calls or reduce batch size |

---

**Date Completed**: _______________

**Configured By**: _______________

**Notes**: 
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
