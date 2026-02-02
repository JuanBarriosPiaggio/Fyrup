# TEST: Follow the _href URL that the API itself provides

Write-Host "Following API-provided _href URLs..." -ForegroundColor Cyan
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

# Step 1: Get a customer to get its _href
Write-Host "Step 1: Getting customer list to find _href..." -ForegroundColor Yellow
$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/customers/?pageSize=1"

try {
    $customers = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    $customer = $customers[0]
    
    Write-Host "Found customer:" -ForegroundColor Green
    Write-Host "  ID: $($customer.ID)" -ForegroundColor White
    Write-Host "  Name: $($customer.CompanyName)" -ForegroundColor White
    Write-Host "  _href: $($customer._href)" -ForegroundColor White
    Write-Host ""
    
    # Step 2: Follow the _href to get full details
    Write-Host "Step 2: Following _href to get FULL customer details..." -ForegroundColor Yellow
    $fullURL = "https://$SUBDOMAIN.simprosuite.com$($customer._href)"
    Write-Host "  Full URL: $fullURL" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        $fullCustomer = Invoke-RestMethod -Uri $fullURL -Method Get -Headers $headers
        
        Write-Host "SUCCESS! Got full customer data!" -ForegroundColor Green
        Write-Host ""
        $fullCustomer | ConvertTo-Json -Depth 10
        Write-Host ""
        
        if ($fullCustomer.Email) {
            Write-Host "EMAIL FIELD FOUND: $($fullCustomer.Email)" -ForegroundColor Green
        } else {
            Write-Host "Email field exists but is empty" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "ERROR following _href: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR getting customer list: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Repeat for contacts
Write-Host "Step 3: Getting contact list to find _href..." -ForegroundColor Yellow
$URL2 = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/contacts/?pageSize=1"

try {
    $contacts = Invoke-RestMethod -Uri $URL2 -Method Get -Headers $headers
    $contact = $contacts[0]
    
    Write-Host "Found contact:" -ForegroundColor Green
    Write-Host "  ID: $($contact.ID)" -ForegroundColor White
    Write-Host "  Name: $($contact.GivenName) $($contact.FamilyName)" -ForegroundColor White
    
    # Check if _href exists
    if ($contact._href) {
        Write-Host "  _href: $($contact._href)" -ForegroundColor White
        Write-Host ""
        
        Write-Host "Step 4: Following _href to get FULL contact details..." -ForegroundColor Yellow
        $fullURL2 = "https://$SUBDOMAIN.simprosuite.com$($contact._href)"
        Write-Host "  Full URL: $fullURL2" -ForegroundColor Cyan
        Write-Host ""
        
        try {
            $fullContact = Invoke-RestMethod -Uri $fullURL2 -Method Get -Headers $headers
            
            Write-Host "SUCCESS! Got full contact data!" -ForegroundColor Green
            Write-Host ""
            $fullContact | ConvertTo-Json -Depth 10
            Write-Host ""
            
            if ($fullContact.Email) {
                Write-Host "EMAIL FIELD FOUND: $($fullContact.Email)" -ForegroundColor Green
            } else {
                Write-Host "Email field exists but is empty" -ForegroundColor Yellow
            }
            
        } catch {
            Write-Host "ERROR following _href: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  WARNING: No _href field in contact!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Contacts may not have individual detail endpoints" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "ERROR getting contact list: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
