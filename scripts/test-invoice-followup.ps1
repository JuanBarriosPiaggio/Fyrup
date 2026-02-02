# Test Invoice Follow-up - See which unpaid invoices would trigger emails today
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

Write-Host "`n=== Invoice Follow-up Test ===" -ForegroundColor Cyan
Write-Host "Testing which UNPAID invoices would trigger follow-up emails today..." -ForegroundColor Yellow
Write-Host ""

# Get all invoices
Write-Host "Fetching all invoices..." -ForegroundColor Yellow
$invoicesUrl = "$baseUrl/invoices/?pageSize=250&columns=ID,DateIssued,IsPaid,Total,Customer"

try {
    $response = Invoke-RestMethod -Uri $invoicesUrl -Headers $headers -Method Get
    $invoices = $response
    
    Write-Host "Total invoices fetched: $($invoices.Count)" -ForegroundColor Green
    Write-Host ""
    
    # Calculate today at midnight
    $today = Get-Date -Hour 0 -Minute 0 -Second 0 -Millisecond 0
    
    # Initialize counters
    $day3Invoices = @()
    $day7Invoices = @()
    $day14Invoices = @()
    $day21Invoices = @()
    $unpaidInvoices = 0
    $paidInvoices = 0
    
    foreach ($invoice in $invoices) {
        # Check if DateIssued exists
        if (-not $invoice.DateIssued) {
            continue
        }
        
        # Only process UNPAID invoices
        if ($invoice.IsPaid -eq $true) {
            $paidInvoices++
            continue
        }
        
        $unpaidInvoices++
        
        # Calculate days since issued
        $issueDate = Get-Date $invoice.DateIssued -Hour 0 -Minute 0 -Second 0 -Millisecond 0
        $daysSinceIssued = ($today - $issueDate).Days
        
        # Get balance due
        $balanceDue = if ($invoice.Total.BalanceDue) { $invoice.Total.BalanceDue } elseif ($invoice.Total.IncTax) { $invoice.Total.IncTax } else { 0 }
        
        # Categorize by day
        if ($daysSinceIssued -eq 3) {
            $day3Invoices += @{
                ID = $invoice.ID
                DateIssued = $invoice.DateIssued
                BalanceDue = $balanceDue
                DaysSince = $daysSinceIssued
            }
        }
        elseif ($daysSinceIssued -eq 7) {
            $day7Invoices += @{
                ID = $invoice.ID
                DateIssued = $invoice.DateIssued
                BalanceDue = $balanceDue
                DaysSince = $daysSinceIssued
            }
        }
        elseif ($daysSinceIssued -eq 14) {
            $day14Invoices += @{
                ID = $invoice.ID
                DateIssued = $invoice.DateIssued
                BalanceDue = $balanceDue
                DaysSince = $daysSinceIssued
            }
        }
        elseif ($daysSinceIssued -eq 21) {
            $day21Invoices += @{
                ID = $invoice.ID
                DateIssued = $invoice.DateIssued
                BalanceDue = $balanceDue
                DaysSince = $daysSinceIssued
            }
        }
    }
    
    # Display results
    Write-Host "=== TODAY'S INVOICE FOLLOW-UP SUMMARY ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Today's Date: " -NoNewline
    Write-Host "$($today.ToString('yyyy-MM-dd'))" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Unpaid Invoices (eligible for follow-up): " -NoNewline
    Write-Host "$unpaidInvoices" -ForegroundColor Red
    Write-Host "Paid Invoices (skipped): " -NoNewline
    Write-Host "$paidInvoices" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "--- Payment Reminder Emails That Would Send Today ---" -ForegroundColor Cyan
    Write-Host ""
    
    # Day 3
    Write-Host "DAY 3 Reminders (Friendly reminder): " -NoNewline
    if ($day3Invoices.Count -gt 0) {
        Write-Host "$($day3Invoices.Count) invoices" -ForegroundColor Green
        Write-Host "  Issued on: " -NoNewline
        $day3Date = $today.AddDays(-3).ToString('yyyy-MM-dd')
        Write-Host "$day3Date" -ForegroundColor Yellow
        foreach ($inv in $day3Invoices) {
            Write-Host "    - Invoice #$($inv.ID) | Amount Due: £$($inv.BalanceDue)" -ForegroundColor White
        }
    } else {
        Write-Host "0 invoices" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Day 7
    Write-Host "DAY 7 Reminders (Payment overdue): " -NoNewline
    if ($day7Invoices.Count -gt 0) {
        Write-Host "$($day7Invoices.Count) invoices" -ForegroundColor Yellow
        Write-Host "  Issued on: " -NoNewline
        $day7Date = $today.AddDays(-7).ToString('yyyy-MM-dd')
        Write-Host "$day7Date" -ForegroundColor Yellow
        foreach ($inv in $day7Invoices) {
            Write-Host "    - Invoice #$($inv.ID) | Amount Due: £$($inv.BalanceDue)" -ForegroundColor White
        }
    } else {
        Write-Host "0 invoices" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Day 14
    Write-Host "DAY 14 Reminders (URGENT - payment required): " -NoNewline
    if ($day14Invoices.Count -gt 0) {
        Write-Host "$($day14Invoices.Count) invoices" -ForegroundColor Red
        Write-Host "  Issued on: " -NoNewline
        $day14Date = $today.AddDays(-14).ToString('yyyy-MM-dd')
        Write-Host "$day14Date" -ForegroundColor Yellow
        foreach ($inv in $day14Invoices) {
            Write-Host "    - Invoice #$($inv.ID) | Amount Due: £$($inv.BalanceDue)" -ForegroundColor White
        }
    } else {
        Write-Host "0 invoices" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Day 21
    Write-Host "DAY 21 Reminders (FINAL NOTICE): " -NoNewline
    if ($day21Invoices.Count -gt 0) {
        Write-Host "$($day21Invoices.Count) invoices" -ForegroundColor Red
        Write-Host "  Issued on: " -NoNewline
        $day21Date = $today.AddDays(-21).ToString('yyyy-MM-dd')
        Write-Host "$day21Date" -ForegroundColor Yellow
        foreach ($inv in $day21Invoices) {
            Write-Host "    - Invoice #$($inv.ID) | Amount Due: £$($inv.BalanceDue)" -ForegroundColor White
        }
    } else {
        Write-Host "0 invoices" -ForegroundColor Gray
    }
    Write-Host ""
    
    # Total
    $totalFollowups = $day3Invoices.Count + $day7Invoices.Count + $day14Invoices.Count + $day21Invoices.Count
    Write-Host "TOTAL PAYMENT REMINDER EMAILS THAT WOULD BE SENT TODAY: " -NoNewline
    Write-Host "$totalFollowups" -ForegroundColor $(if ($totalFollowups -gt 0) { "Yellow" } else { "Gray" })
    Write-Host ""
    
    if ($totalFollowups -eq 0) {
        Write-Host "No payment reminder emails would be sent today." -ForegroundColor Yellow
        Write-Host "This is normal - emails only send when invoices hit exact day markers (3, 7, 14, 21)." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "=== TEST COMPLETE ===" -ForegroundColor Green
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    }
}
