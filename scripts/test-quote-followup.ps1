# Test Quote Follow-up - See which quotes would trigger emails today
# Date: January 23, 2026

$apiToken = "c035c60b6a535c7f515627cd15fd76d4a7a25231"
$subdomain = "fyrup"
$companyId = "0"
$baseUrl = "https://$subdomain.simprosuite.com/api/v1.0/companies/$companyId"

$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

Write-Host "`n=== Quote Follow-up Test ===" -ForegroundColor Cyan
Write-Host "Testing which quotes would trigger follow-up emails today..." -ForegroundColor Yellow
Write-Host ""

# Get all quotes
Write-Host "Fetching all quotes..." -ForegroundColor Yellow
$quotesUrl = "$baseUrl/quotes/?pageSize=250&columns=ID,DateIssued,Status,Description"

try {
    $response = Invoke-RestMethod -Uri $quotesUrl -Headers $headers -Method Get
    $quotes = $response
    
    Write-Host "Total quotes fetched: $($quotes.Count)" -ForegroundColor Green
    Write-Host ""
    
    # Calculate today at midnight
    $today = Get-Date -Hour 0 -Minute 0 -Second 0 -Millisecond 0
    
    # Initialize counters
    $day3Quotes = @()
    $day7Quotes = @()
    $day14Quotes = @()
    $day21Quotes = @()
    $activeQuotes = 0
    $skippedQuotes = 0
    
    foreach ($quote in $quotes) {
        # Check if DateIssued exists
        if (-not $quote.DateIssued) {
            continue
        }
        
        # Check status - skip accepted/declined/completed quotes
        # Handle Status as either object or string
        $statusValue = ""
        if ($quote.Status) {
            if ($quote.Status -is [PSCustomObject]) {
                $statusValue = ($quote.Status.Name -or $quote.Status.name -or "").ToString().ToLower()
            } else {
                $statusValue = $quote.Status.ToString().ToLower()
            }
        }
        
        if ($statusValue -match "accept|decline|lost|complete") {
            $skippedQuotes++
            continue
        }
        
        $activeQuotes++
        
        # Calculate days since issued
        $issueDate = Get-Date $quote.DateIssued -Hour 0 -Minute 0 -Second 0 -Millisecond 0
        $daysSinceIssued = ($today - $issueDate).Days
        
        # Categorize by day
        if ($daysSinceIssued -eq 3) {
            $day3Quotes += @{
                ID = $quote.ID
                DateIssued = $quote.DateIssued
                Status = $statusValue
                DaysSince = $daysSinceIssued
            }
        }
        elseif ($daysSinceIssued -eq 7) {
            $day7Quotes += @{
                ID = $quote.ID
                DateIssued = $quote.DateIssued
                Status = $statusValue
                DaysSince = $daysSinceIssued
            }
        }
        elseif ($daysSinceIssued -eq 14) {
            $day14Quotes += @{
                ID = $quote.ID
                DateIssued = $quote.DateIssued
                Status = $statusValue
                DaysSince = $daysSinceIssued
            }
        }
        elseif ($daysSinceIssued -eq 21) {
            $day21Quotes += @{
                ID = $quote.ID
                DateIssued = $quote.DateIssued
                Status = $statusValue
                DaysSince = $daysSinceIssued
            }
        }
    }
    
    # Display results
    Write-Host "=== TODAY'S FOLLOW-UP SUMMARY ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Today's Date: " -NoNewline
    Write-Host "$($today.ToString('yyyy-MM-dd'))" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Active Quotes (eligible for follow-up): " -NoNewline
    Write-Host "$activeQuotes" -ForegroundColor Green
    Write-Host "Skipped Quotes (accepted/declined/completed): " -NoNewline
    Write-Host "$skippedQuotes" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "--- Follow-up Emails That Would Send Today ---" -ForegroundColor Cyan
    Write-Host ""
    
    # Day 3
    Write-Host "DAY 3 Follow-ups (Check-in): " -NoNewline
    if ($day3Quotes.Count -gt 0) {
        Write-Host "$($day3Quotes.Count) quotes" -ForegroundColor Green
        Write-Host "  Issued on: " -NoNewline
        $day3Date = $today.AddDays(-3).ToString('yyyy-MM-dd')
        Write-Host "$day3Date" -ForegroundColor Yellow
        foreach ($quote in $day3Quotes) {
            Write-Host "    - Quote #$($quote.ID) | Status: $($quote.Status)" -ForegroundColor White
        }
    } else {
        Write-Host "0 quotes" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Day 7
    Write-Host "DAY 7 Follow-ups (Acceptance prompt): " -NoNewline
    if ($day7Quotes.Count -gt 0) {
        Write-Host "$($day7Quotes.Count) quotes" -ForegroundColor Green
        Write-Host "  Issued on: " -NoNewline
        $day7Date = $today.AddDays(-7).ToString('yyyy-MM-dd')
        Write-Host "$day7Date" -ForegroundColor Yellow
        foreach ($quote in $day7Quotes) {
            Write-Host "    - Quote #$($quote.ID) | Status: $($quote.Status)" -ForegroundColor White
        }
    } else {
        Write-Host "0 quotes" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Day 14
    Write-Host "DAY 14 Follow-ups (Mid-point check): " -NoNewline
    if ($day14Quotes.Count -gt 0) {
        Write-Host "$($day14Quotes.Count) quotes" -ForegroundColor Green
        Write-Host "  Issued on: " -NoNewline
        $day14Date = $today.AddDays(-14).ToString('yyyy-MM-dd')
        Write-Host "$day14Date" -ForegroundColor Yellow
        foreach ($quote in $day14Quotes) {
            Write-Host "    - Quote #$($quote.ID) | Status: $($quote.Status)" -ForegroundColor White
        }
    } else {
        Write-Host "0 quotes" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Day 21
    Write-Host "DAY 21 Follow-ups (Final reminder): " -NoNewline
    if ($day21Quotes.Count -gt 0) {
        Write-Host "$($day21Quotes.Count) quotes" -ForegroundColor Green
        Write-Host "  Issued on: " -NoNewline
        $day21Date = $today.AddDays(-21).ToString('yyyy-MM-dd')
        Write-Host "$day21Date" -ForegroundColor Yellow
        foreach ($quote in $day21Quotes) {
            Write-Host "    - Quote #$($quote.ID) | Status: $($quote.Status)" -ForegroundColor White
        }
    } else {
        Write-Host "0 quotes" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Total
    $totalFollowups = $day3Quotes.Count + $day7Quotes.Count + $day14Quotes.Count + $day21Quotes.Count
    Write-Host "TOTAL EMAILS THAT WOULD BE SENT TODAY: " -NoNewline
    Write-Host "$totalFollowups" -ForegroundColor $(if ($totalFollowups -gt 0) { "Green" } else { "Gray" })
    Write-Host ""
    
    if ($totalFollowups -eq 0) {
        Write-Host "No follow-up emails would be sent today." -ForegroundColor Yellow
        Write-Host "This is normal - emails only send when quotes hit exact day markers (3, 7, 14, 21)." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "=== TEST COMPLETE ===" -ForegroundColor Green
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}
