# Test Simpro Correct Customer/Contact Endpoints
# Using the _href paths from the API response

Write-Host "Testing Correct Simpro Endpoints..." -ForegroundColor Cyan
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

# Test 1: Get Customer using /customers/companies/{id}
Write-Host "Test 1: Get Customer using /customers/companies/ endpoint..." -ForegroundColor Yellow
$CUSTOMER_ID = "3"  # Siren Training
$CUSTOMER_URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/companies/$CUSTOMER_ID/"
Write-Host "URL: $CUSTOMER_URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $CUSTOMER_URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Customer data retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Customer Data:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    if ($response.Email -or $response.EmailAddress -or $response.PrimaryContact -or $response.ContactEmail) {
        Write-Host "EMAIL/CONTACT FIELD FOUND!" -ForegroundColor Green
    } else {
        Write-Host "No direct email field - checking other fields..." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: Customer API failed" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 2: Get Contact using different possible endpoints
Write-Host "Test 2: Get Contact data..." -ForegroundColor Yellow
$CONTACT_ID = "964"  # Ray Lee

# Try /contacts/people/{id} based on the pattern
$CONTACT_URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/people/$CONTACT_ID/"
Write-Host "Trying URL: $CONTACT_URL" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $CONTACT_URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Contact data retrieved!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Contact Data:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    if ($response.Email -or $response.EmailAddress) {
        Write-Host "EMAIL FOUND!" -ForegroundColor Green
    } else {
        Write-Host "No email field found" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: Contact API failed with /contacts/people/" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    
    # Try alternative: just /contacts/{id}
    Write-Host ""
    Write-Host "Trying alternative: /contacts/{id}" -ForegroundColor Yellow
    $CONTACT_URL_ALT = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/$CONTACT_ID/"
    
    try {
        $response = Invoke-RestMethod -Uri $CONTACT_URL_ALT -Method Get -Headers $headers
        Write-Host "SUCCESS with /contacts/{id}!" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 5
    } catch {
        Write-Host "Also failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
