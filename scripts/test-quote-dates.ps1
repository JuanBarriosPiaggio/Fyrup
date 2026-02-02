# TEST: Check ALL date fields in quotes to find the right one

Write-Host "Checking ALL date fields in quotes..." -ForegroundColor Cyan
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

# Get quotes with ALL date-related columns
Write-Host "Requesting quotes with ALL date fields..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?pageSize=5&columns=ID,DateIssued,DateApproved,DueDate,ValidityDays,Stage,CustomerStage"
Write-Host "URL: $URL" -ForegroundColor Cyan
Write-Host ""

try {
    $quotes = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Got $($quotes.Count) quotes" -ForegroundColor Green
    Write-Host ""
    
    $today = Get-Date
    
    foreach ($quote in $quotes) {
        Write-Host "Quote ID: $($quote.ID)" -ForegroundColor Cyan
        Write-Host "  DateIssued: $($quote.DateIssued)" -ForegroundColor White
        Write-Host "  ValidityDays: $($quote.ValidityDays)" -ForegroundColor White
        Write-Host "  DueDate: $($quote.DueDate)" -ForegroundColor White
        Write-Host "  DateApproved: $($quote.DateApproved)" -ForegroundColor White
        Write-Host "  Stage: $($quote.Stage)" -ForegroundColor White
        Write-Host "  CustomerStage: $($quote.CustomerStage)" -ForegroundColor White
        
        # Calculate expiry from DateIssued + ValidityDays
        if ($quote.DateIssued -and $quote.ValidityDays) {
            $issueDate = [DateTime]$quote.DateIssued
            $expiryDate = $issueDate.AddDays($quote.ValidityDays)
            $daysUntilExpiry = ($expiryDate - $today).Days
            
            Write-Host "  -> Calculated Expiry: $($expiryDate.ToString('yyyy-MM-dd'))" -ForegroundColor Yellow
            Write-Host "  -> Days until expiry: $daysUntilExpiry" -ForegroundColor $(if ($daysUntilExpiry -lt -7) { "Red" } elseif ($daysUntilExpiry -lt 0) { "Yellow" } else { "Green" })
            
            if ($daysUntilExpiry -lt -7) {
                Write-Host "  -> THIS QUOTE IS 7+ DAYS OVERDUE!" -ForegroundColor Red
            }
        }
        
        Write-Host ""
    }
    
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "IMPORTANT: Which date field shows overdue in Simpro UI?" -ForegroundColor Yellow
    Write-Host "  - If using DueDate: quotes should have this field set" -ForegroundColor White
    Write-Host "  - If using DateIssued + ValidityDays: we need to calculate expiry" -ForegroundColor White
    Write-Host "  - Check your Simpro UI to see which date you're looking at!" -ForegroundColor White
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
