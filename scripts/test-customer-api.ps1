# Test Simpro Customer API
# Testing if we can get customer email addresses

Write-Host "Testing Simpro Customer API..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$TOKEN = "c035c60b6a535c7f515627cd15fd76d4a7a25231"
$SUBDOMAIN = "fyrup"
$COMPANY_ID = "0"

# Test Customer ID 3 (Siren Training from your quotes)
$CUSTOMER_ID = "3"
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/$CUSTOMER_ID/"

Write-Host "Testing Customer endpoint for Customer ID $CUSTOMER_ID" -ForegroundColor Yellow
Write-Host "URL: $URL" -ForegroundColor Yellow
Write-Host ""

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Customer data retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Customer Data:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    if ($response.Email -or $response.EmailAddress) {
        Write-Host "EMAIL FOUND!" -ForegroundColor Green
    } else {
        Write-Host "WARNING: No email field found in customer data" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: Customer API request failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode.value__ -eq 404) {
        Write-Host "404 Not Found - Customer endpoint may not be available or customer ID doesn't exist" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan

# Also test Contact API
Write-Host ""
Write-Host "Testing Contact endpoint for Contact ID 964 (Ray Lee)" -ForegroundColor Yellow

$CONTACT_ID = "964"
$CONTACT_URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/$CONTACT_ID/"

Write-Host "URL: $CONTACT_URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $CONTACT_URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Contact data retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Contact Data:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    if ($response.Email -or $response.EmailAddress) {
        Write-Host "EMAIL FOUND!" -ForegroundColor Green
    } else {
        Write-Host "WARNING: No email field found in contact data" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: Contact API request failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
