# TEST: Scan ALL quotes to find any that are truly overdue

Write-Host "Scanning ALL quotes for overdue ones..." -ForegroundColor Cyan
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

# Get MORE quotes to find older ones
Write-Host "Getting 50 quotes to scan for overdue ones..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?pageSize=50&columns=ID,DateIssued,ValidityDays,DueDate,Stage,CustomerStage,Customer"
Write-Host ""

try {
    $quotes = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Got $($quotes.Count) quotes" -ForegroundColor Green
    Write-Host ""
    
    $today = Get-Date
    $overdueByDueDate = @()
    $overdueByExpiry = @()
    
    foreach ($quote in $quotes) {
        # Check DueDate
        if ($quote.DueDate) {
            $dueDate = [DateTime]$quote.DueDate
            $daysOverdue = ($today - $dueDate).Days
            
            if ($daysOverdue -ge 7) {
                $overdueByDueDate += @{
                    ID = $quote.ID
                    DaysOverdue = $daysOverdue
                    DueDate = $quote.DueDate
                }
            }
        }
        
        # Check Calculated Expiry
        if ($quote.DateIssued -and $quote.ValidityDays) {
            $issueDate = [DateTime]$quote.DateIssued
            $expiryDate = $issueDate.AddDays($quote.ValidityDays)
            $daysOverdue = ($today - $expiryDate).Days
            
            if ($daysOverdue -ge 7) {
                $overdueByExpiry += @{
                    ID = $quote.ID
                    DaysOverdue = $daysOverdue
                    Issued = $quote.DateIssued
                    ValidDays = $quote.ValidityDays
                    Expiry = $expiryDate.ToString('yyyy-MM-dd')
                }
            }
        }
    }
    
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "RESULTS:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quotes overdue by DueDate field (7+ days): $($overdueByDueDate.Count)" -ForegroundColor $(if ($overdueByDueDate.Count -gt 0) { "Red" } else { "Green" })
    
    if ($overdueByDueDate.Count -gt 0) {
        Write-Host ""
        Write-Host "Overdue quotes (by DueDate):" -ForegroundColor Red
        foreach ($q in $overdueByDueDate | Select-Object -First 5) {
            Write-Host "  Quote $($q.ID): $($q.DaysOverdue) days overdue (Due: $($q.DueDate))" -ForegroundColor White
        }
    }
    
    Write-Host ""
    Write-Host "Quotes overdue by Calculated Expiry (7+ days): $($overdueByExpiry.Count)" -ForegroundColor $(if ($overdueByExpiry.Count -gt 0) { "Red" } else { "Green" })
    
    if ($overdueByExpiry.Count -gt 0) {
        Write-Host ""
        Write-Host "Overdue quotes (by Expiry):" -ForegroundColor Red
        foreach ($q in $overdueByExpiry | Select-Object -First 5) {
            Write-Host "  Quote $($q.ID): $($q.DaysOverdue) days overdue (Expired: $($q.Expiry))" -ForegroundColor White
        }
    }
    
    Write-Host ""
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "QUESTION FOR YOU:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "When you see 'overdue' quotes in Simpro UI, which date are you looking at?" -ForegroundColor White
    Write-Host "  A) DueDate field (March 2026 dates)" -ForegroundColor White
    Write-Host "  B) Calculated Expiry (DateIssued + ValidityDays = Feb 2026)" -ForegroundColor White
    Write-Host "  C) Something else?" -ForegroundColor White
    Write-Host ""
    Write-Host "Please check a quote in Simpro UI and tell me which date shows as overdue!" -ForegroundColor Yellow
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
