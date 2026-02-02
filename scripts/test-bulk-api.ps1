# Test Simpro Bulk Customer/Contact APIs
# Testing if we can list all customers and contacts

Write-Host "Testing Simpro Bulk APIs..." -ForegroundColor Cyan
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

# Test 1: List all customers
Write-Host "Test 1: Listing all customers..." -ForegroundColor Yellow
$CUSTOMERS_URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=5"
Write-Host "URL: $CUSTOMERS_URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $CUSTOMERS_URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Customers list retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Customer Data (first 5):" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    
} catch {
    Write-Host "ERROR: Customers list API failed" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 2: List all contacts
Write-Host "Test 2: Listing all contacts..." -ForegroundColor Yellow
$CONTACTS_URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=5"
Write-Host "URL: $CONTACTS_URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $CONTACTS_URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Contacts list retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Contact Data (first 5):" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    
} catch {
    Write-Host "ERROR: Contacts list API failed" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 3: Get more quote details with expanded columns
Write-Host "Test 3: Getting quote with more customer/contact fields..." -ForegroundColor Yellow
$QUOTES_URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?pageSize=1&columns=ID,Customer.CompanyName,Customer.Email,CustomerContact.GivenName,CustomerContact.Email"
Write-Host "URL: $QUOTES_URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $QUOTES_URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Quote with expanded fields retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Quote Data:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    
} catch {
    Write-Host "ERROR: Expanded quote API failed" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
