# TEST: Try to get contact details directly by ID

Write-Host "Testing contact endpoints..." -ForegroundColor Cyan
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

# Get a contact ID
Write-Host "Getting a contact ID from the list..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=1"

try {
    $contacts = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    $contactID = $contacts[0].ID
    
    Write-Host "Found contact ID: $contactID" -ForegroundColor Green
    Write-Host ""
    
    # Try direct endpoint
    Write-Host "Trying: /contacts/$contactID/" -ForegroundColor Yellow
    $URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/$contactID/"
    
    try {
        $contact = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
        Write-Host "SUCCESS!" -ForegroundColor Green
        Write-Host ""
        $contact | ConvertTo-Json -Depth 10
        Write-Host ""
        
        if ($contact.Email) {
            Write-Host "EMAIL FOUND: $($contact.Email)" -ForegroundColor Green
        }
    } catch {
        Write-Host "FAILED with status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
