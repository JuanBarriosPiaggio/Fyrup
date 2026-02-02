# TEST: Show FULL JSON structure of one customer and contact
# to see ALL available fields

Write-Host "Getting FULL data structure..." -ForegroundColor Cyan
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

# Get one customer with FULL details
Write-Host "Getting ONE customer with ALL fields..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=1"
Write-Host ""

try {
    $customer = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "CUSTOMER DATA (ALL FIELDS):" -ForegroundColor Green
    Write-Host ""
    $customer[0] | ConvertTo-Json -Depth 10
    Write-Host ""
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Get one contact with FULL details
Write-Host "Getting ONE contact with ALL fields..." -ForegroundColor Yellow
$URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=1"
Write-Host ""

try {
    $contact = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
    
    Write-Host "CONTACT DATA (ALL FIELDS):" -ForegroundColor Green
    Write-Host ""
    $contact[0] | ConvertTo-Json -Depth 10
    Write-Host ""
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Look for ANY field that might contain email addresses!" -ForegroundColor Yellow
Write-Host "Common field names: Email, EmailAddress, ContactEmail, PrimaryEmail, etc." -ForegroundColor White
