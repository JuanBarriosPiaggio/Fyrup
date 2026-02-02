# Test if bulk APIs return email addresses with column parameters

Write-Host "Testing Bulk APIs with Column Parameters..." -ForegroundColor Cyan
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

# Test: Get customers with email columns
Write-Host "Test: Get customers with email field..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=3&columns=ID,CompanyName,Email,ContactEmail,PrimaryEmail"
Write-Host "URL: $URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Customer data with columns retrieved!" -ForegroundColor Green
    Write-Host ""
    $response | ConvertTo-Json -Depth 5
    
} catch {
    Write-Host "ERROR: Failed" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test: Get contacts with email columns
Write-Host "Test: Get contacts with email field..." -ForegroundColor Yellow
$URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=3&columns=ID,GivenName,FamilyName,Email,EmailAddress"
Write-Host "URL: $URL2" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Contact data with columns retrieved!" -ForegroundColor Green
    Write-Host ""
    $response | ConvertTo-Json -Depth 5
    
} catch {
    Write-Host "ERROR: Failed" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
