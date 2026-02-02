# TEST: Get ALL quotes with pagination to find overdue ones

Write-Host "Getting ALL quotes (with pagination)..." -ForegroundColor Cyan
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

$allQuotes = @()
$page = 0
$pageSize = 250  # Max page size
$hasMore = $true

Write-Host "Fetching all quotes (this may take a moment)..." -ForegroundColor Yellow
Write-Host ""

while ($hasMore) {
    $URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?page=$page&pageSize=$pageSize&columns=ID,DateIssued,ValidityDays,DueDate,Stage,CustomerStage,Customer"
    
    try {
        $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
        
        if ($response.Count -gt 0) {
            $allQuotes += $response
            Write-Host "  Page $page : Got $($response.Count) quotes (Total so far: $($allQuotes.Count))" -ForegroundColor Cyan
            $page++
            
            # If we got less than pageSize, we've reached the end
            if ($response.Count -lt $pageSize) {
                $hasMore = $false
            }
        } else {
            $hasMore = $false
        }
        
    } catch {
        Write-Host "  ERROR on page $page : $($_.Exception.Message)" -ForegroundColor Red
        $hasMore = $false
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "TOTAL QUOTES RETRIEVED: $($allQuotes.Count)" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Now analyze ALL quotes for overdue
$today = Get-Date
$overdueByDueDate = @()
$overdueByExpiry = @()

Write-Host "Analyzing all quotes for overdue status..." -ForegroundColor Yellow
Write-Host ""

foreach ($quote in $allQuotes) {
    # Check DueDate
    if ($quote.DueDate) {
        $dueDate = [DateTime]$quote.DueDate
        $daysOverdue = ($today - $dueDate).Days
        
        if ($daysOverdue -ge 7) {
            $overdueByDueDate += [PSCustomObject]@{
                ID = $quote.ID
                DaysOverdue = $daysOverdue
                DueDate = $quote.DueDate
                CustomerID = $quote.Customer.ID
            }
        }
    }
    
    # Check Calculated Expiry (DateIssued + ValidityDays)
    if ($quote.DateIssued -and $quote.ValidityDays) {
        $issueDate = [DateTime]$quote.DateIssued
        $expiryDate = $issueDate.AddDays($quote.ValidityDays)
        $daysOverdue = ($today - $expiryDate).Days
        
        if ($daysOverdue -ge 7) {
            $overdueByExpiry += [PSCustomObject]@{
                ID = $quote.ID
                DaysOverdue = $daysOverdue
                Issued = $quote.DateIssued
                ValidDays = $quote.ValidityDays
                Expiry = $expiryDate.ToString('yyyy-MM-dd')
                CustomerID = $quote.Customer.ID
            }
        }
    }
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "OVERDUE ANALYSIS RESULTS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Total quotes checked: $($allQuotes.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Quotes overdue by DueDate field (7+ days): $($overdueByDueDate.Count)" -ForegroundColor $(if ($overdueByDueDate.Count -gt 0) { "Red" } else { "Green" })

if ($overdueByDueDate.Count -gt 0) {
    Write-Host ""
    Write-Host "Overdue quotes (by DueDate):" -ForegroundColor Red
    $overdueByDueDate | Sort-Object -Property DaysOverdue -Descending | Select-Object -First 10 | ForEach-Object {
        Write-Host "  Quote $($_.ID): $($_.DaysOverdue) days overdue (Due: $($_.DueDate)) | Customer: $($_.CustomerID)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "Quotes overdue by Calculated Expiry (7+ days): $($overdueByExpiry.Count)" -ForegroundColor $(if ($overdueByExpiry.Count -gt 0) { "Red" } else { "Green" })

if ($overdueByExpiry.Count -gt 0) {
    Write-Host ""
    Write-Host "Overdue quotes (by Expiry = DateIssued + ValidityDays):" -ForegroundColor Red
    $overdueByExpiry | Sort-Object -Property DaysOverdue -Descending | Select-Object -First 10 | ForEach-Object {
        Write-Host "  Quote $($_.ID): $($_.DaysOverdue) days overdue (Expired: $($_.Expiry)) | Customer: $($_.CustomerID)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "NEXT STEP:" -ForegroundColor Yellow
Write-Host ""

if ($overdueByDueDate.Count -eq 0 -and $overdueByExpiry.Count -eq 0) {
    Write-Host "NO OVERDUE QUOTES FOUND in your entire system!" -ForegroundColor Green
    Write-Host ""
    Write-Host "This could mean:" -ForegroundColor Yellow
    Write-Host "  1. All your quotes are up to date (great!)" -ForegroundColor White
    Write-Host "  2. Simpro defines 'overdue' differently than we're checking" -ForegroundColor White
    Write-Host "  3. You're looking at a different field in Simpro UI" -ForegroundColor White
    Write-Host ""
    Write-Host "Please share:" -ForegroundColor Yellow
    Write-Host "  - A screenshot of the 'overdue' quotes list in Simpro" -ForegroundColor White
    Write-Host "  - What column/date shows them as overdue" -ForegroundColor White
} else {
    Write-Host "FOUND OVERDUE QUOTES! The workflow will work." -ForegroundColor Green
    Write-Host ""
    Write-Host "I'll update the workflow to use the correct date field." -ForegroundColor White
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
