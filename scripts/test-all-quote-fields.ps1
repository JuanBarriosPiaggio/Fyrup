# TEST: Get ONE quote with ALL fields to see date fields available

Write-Host "Getting ONE quote with ALL fields to find date fields..." -ForegroundColor Cyan
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

# Get ONE quote with ALL fields (no column filtering)
Write-Host "Getting one complete quote to see ALL available date fields..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?pageSize=1"
Write-Host "URL: $URL" -ForegroundColor Cyan
Write-Host ""

try {
    $quotes = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    $quote = $quotes[0]
    
    Write-Host "SUCCESS! Quote data:" -ForegroundColor Green
    Write-Host ""
    $quote | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "Looking for date fields..." -ForegroundColor Yellow
    Write-Host ""
    
    # List all properties that might be dates
    $quote.PSObject.Properties | ForEach-Object {
        if ($_.Name -like "*Date*" -or $_.Name -like "*date*") {
            Write-Host "  $($_.Name): $($_.Value)" -ForegroundColor White
        }
    }
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "Common date fields to look for:" -ForegroundColor Yellow
    Write-Host "  - DueDate (quote expiry/deadline)" -ForegroundColor White
    Write-Host "  - DateIssued (when quote was created)" -ForegroundColor White
    Write-Host "  - DateModified (last update)" -ForegroundColor White
    Write-Host "  - ExpiryDate (alternative to DueDate)" -ForegroundColor White
    Write-Host "  - DateCreated" -ForegroundColor White
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
