# TEST: Verify emails ARE in bulk customer/contact data

Write-Host "Testing if bulk APIs include Email fields..." -ForegroundColor Cyan
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

# Test 1: Get ALL customers (no column filtering)
Write-Host "Test 1: Getting ALL customers..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=10"
Write-Host "URL: $URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Got $($response.Count) customers" -ForegroundColor Green
    Write-Host ""
    
    # Check first customer for Email field
    if ($response.Count -gt 0) {
        $firstCustomer = $response[0]
        Write-Host "First Customer:" -ForegroundColor Cyan
        Write-Host "  ID: $($firstCustomer.ID)" -ForegroundColor White
        Write-Host "  Name: $($firstCustomer.CompanyName)$($firstCustomer.GivenName) $($firstCustomer.FamilyName)" -ForegroundColor White
        Write-Host "  Email: $($firstCustomer.Email)" -ForegroundColor White
        Write-Host ""
        
        if ($firstCustomer.Email) {
            Write-Host "EMAIL FIELD FOUND IN CUSTOMERS!" -ForegroundColor Green
        } else {
            Write-Host "Email field exists but is empty for this customer" -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 2: Get ALL contacts (no column filtering)
Write-Host "Test 2: Getting ALL contacts..." -ForegroundColor Yellow
$URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=10"
Write-Host "URL: $URL2" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Got $($response.Count) contacts" -ForegroundColor Green
    Write-Host ""
    
    # Check first contact for Email field
    if ($response.Count -gt 0) {
        $firstContact = $response[0]
        Write-Host "First Contact:" -ForegroundColor Cyan
        Write-Host "  ID: $($firstContact.ID)" -ForegroundColor White
        Write-Host "  Name: $($firstContact.GivenName) $($firstContact.FamilyName)" -ForegroundColor White
        Write-Host "  Email: $($firstContact.Email)" -ForegroundColor White
        Write-Host ""
        
        if ($firstContact.Email) {
            Write-Host "EMAIL FIELD FOUND IN CONTACTS!" -ForegroundColor Green
        } else {
            Write-Host "Email field exists but is empty for this contact" -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "SUMMARY:" -ForegroundColor Yellow
Write-Host "If you see emails above, we can build the N8N workflow!" -ForegroundColor Yellow
Write-Host "The workflow will:" -ForegroundColor White
Write-Host "  1. Fetch ALL quotes" -ForegroundColor White
Write-Host "  2. Fetch ALL customers (with emails)" -ForegroundColor White
Write-Host "  3. Fetch ALL contacts (with emails)" -ForegroundColor White
Write-Host "  4. Match them by ID in JavaScript" -ForegroundColor White
Write-Host "  5. Send emails to overdue quotes" -ForegroundColor White
