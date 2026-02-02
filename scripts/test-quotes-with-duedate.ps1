# TEST: Get quotes with DueDate field

Write-Host "Testing Quotes API with DueDate column..." -ForegroundColor Cyan
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

# Get quotes with specific columns including DueDate
Write-Host "Requesting quotes with columns: ID, Description, DueDate, Customer, CustomerContact, Total" -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/quotes/?pageSize=5&columns=ID,Description,DueDate,Customer,CustomerContact,Total"
Write-Host "URL: $URL" -ForegroundColor Cyan
Write-Host ""

try {
    $quotes = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "SUCCESS! Got $($quotes.Count) quotes" -ForegroundColor Green
    Write-Host ""
    
    # Check each quote for DueDate
    $quotesWithDueDate = 0
    $overdueQuotes = 0
    $today = Get-Date
    
    foreach ($quote in $quotes) {
        if ($quote.DueDate) {
            $quotesWithDueDate++
            $dueDate = [DateTime]$quote.DueDate
            $daysOverdue = ($today - $dueDate).Days
            
            Write-Host "Quote ID: $($quote.ID)" -ForegroundColor White
            Write-Host "  DueDate: $($quote.DueDate)" -ForegroundColor White
            Write-Host "  Days Overdue: $daysOverdue" -ForegroundColor $(if ($daysOverdue -ge 7) { "Red" } else { "Yellow" })
            Write-Host "  Customer ID: $($quote.Customer)" -ForegroundColor White
            Write-Host "  CustomerContact ID: $($quote.CustomerContact)" -ForegroundColor White
            Write-Host ""
            
            if ($daysOverdue -ge 7) {
                $overdueQuotes++
            }
        } else {
            Write-Host "Quote ID: $($quote.ID) - NO DueDate field" -ForegroundColor Yellow
            Write-Host ""
        }
    }
    
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "Summary:" -ForegroundColor Yellow
    Write-Host "  Total quotes: $($quotes.Count)" -ForegroundColor White
    Write-Host "  Quotes with DueDate: $quotesWithDueDate" -ForegroundColor White
    Write-Host "  Quotes overdue by 7+ days: $overdueQuotes" -ForegroundColor $(if ($overdueQuotes -gt 0) { "Green" } else { "Yellow" })
    Write-Host ""
    
    if ($quotesWithDueDate -eq 0) {
        Write-Host "WARNING: None of the quotes have DueDate field!" -ForegroundColor Red
        Write-Host "This means the column parameter might not be working, or quotes don't have due dates set in Simpro." -ForegroundColor Yellow
    } elseif ($overdueQuotes -gt 0) {
        Write-Host "SUCCESS! Found $overdueQuotes quotes that are 7+ days overdue!" -ForegroundColor Green
        Write-Host "The N8N workflow should now work correctly." -ForegroundColor Green
    } else {
        Write-Host "No quotes are 7+ days overdue yet." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
