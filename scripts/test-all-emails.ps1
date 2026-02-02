# TEST: Check ALL customers and contacts for email addresses

Write-Host "Checking ALL records for email addresses..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$TOKEN = "c035c60b6a535c7f515627cd15fd76d4a7a25231"
$SUBDOMAIN = "fyrup"
$COMPANY_ID = "0"

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

# Test: Get customers and check ALL for emails
Write-Host "Checking ALL customers for email addresses..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=50"
Write-Host ""

try {
    $customers = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "Total customers retrieved: $($customers.Count)" -ForegroundColor Cyan
    
    $customersWithEmail = $customers | Where-Object { $_.Email -and $_.Email.Trim() -ne "" }
    
    Write-Host "Customers WITH email addresses: $($customersWithEmail.Count)" -ForegroundColor Green
    Write-Host ""
    
    if ($customersWithEmail.Count -gt 0) {
        Write-Host "FOUND CUSTOMERS WITH EMAILS!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Yellow
        foreach ($customer in $customersWithEmail | Select-Object -First 5) {
            Write-Host "  ID: $($customer.ID) | Name: $($customer.CompanyName)$($customer.GivenName) $($customer.FamilyName) | Email: $($customer.Email)" -ForegroundColor White
        }
    } else {
        Write-Host "WARNING: None of the first 50 customers have email addresses!" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test: Get contacts and check ALL for emails
Write-Host "Checking ALL contacts for email addresses..." -ForegroundColor Yellow
$URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=50"
Write-Host ""

try {
    $contacts = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
    
    Write-Host "Total contacts retrieved: $($contacts.Count)" -ForegroundColor Cyan
    
    $contactsWithEmail = $contacts | Where-Object { $_.Email -and $_.Email.Trim() -ne "" }
    
    Write-Host "Contacts WITH email addresses: $($contactsWithEmail.Count)" -ForegroundColor Green
    Write-Host ""
    
    if ($contactsWithEmail.Count -gt 0) {
        Write-Host "FOUND CONTACTS WITH EMAILS!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Yellow
        foreach ($contact in $contactsWithEmail | Select-Object -First 5) {
            Write-Host "  ID: $($contact.ID) | Name: $($contact.GivenName) $($contact.FamilyName) | Email: $($contact.Email)" -ForegroundColor White
        }
    } else {
        Write-Host "WARNING: None of the first 50 contacts have email addresses!" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEP:" -ForegroundColor Yellow
Write-Host "If emails were found above, the N8N workflow will work!" -ForegroundColor White
Write-Host "If NO emails were found, we need to check if emails are stored" -ForegroundColor White
Write-Host "in a different location in your Simpro system." -ForegroundColor White
