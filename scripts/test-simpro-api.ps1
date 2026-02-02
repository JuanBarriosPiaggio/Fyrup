# Test Simpro API Connection (PowerShell)
# Your configuration is ready to test

Write-Host "Testing Simpro API Connection..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Your API Token
$TOKEN = "c035c60b6a535c7f515627cd15fd76d4a7a25231"

# Your configuration (ready to test):
$SUBDOMAIN = "fyrup"
$COMPANY_ID = "0"

# Build the URL
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?pageSize=1"

Write-Host "Testing endpoint: $URL" -ForegroundColor Yellow
Write-Host ""

# Set up headers
$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

try {
    # Make the API request
    $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Your API token works!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 3
    
} catch {
    Write-Host "ERROR: API request failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "401 Unauthorized - Check your API token or Company ID" -ForegroundColor Red
    } elseif ($_.Exception.Response.StatusCode.value__ -eq 404) {
        Write-Host "404 Not Found - Check your subdomain or Company ID" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
