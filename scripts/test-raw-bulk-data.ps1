# Test what fields are ACTUALLY available in bulk customer/contact data
# No column filtering - just get raw data

Write-Host "Getting RAW bulk data to see available fields..." -ForegroundColor Cyan
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

# Test 1: Get ONE raw customer to see ALL available fields
Write-Host "Test 1: Getting ONE raw customer record..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=1"
Write-Host "URL: $URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Here are ALL the fields available for customers:" -ForegroundColor Green
    Write-Host ""
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "Look for ANY field that might contain email!" -ForegroundColor Yellow
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 2: Get ONE raw contact to see ALL available fields
Write-Host "Test 2: Getting ONE raw contact record..." -ForegroundColor Yellow
$URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=1"
Write-Host "URL: $URL2" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Here are ALL the fields available for contacts:" -ForegroundColor Green
    Write-Host ""
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "Look for ANY field that might contain email!" -ForegroundColor Yellow
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Please copy the output above and share it!" -ForegroundColor Yellow
Write-Host "We need to see what fields ARE available in your Simpro API." -ForegroundColor Yellow
