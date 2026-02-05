# Test Job Status Values
# This script checks what status values exist in your jobs data

$TOKEN = "c035c60b6a535c7f515627cd15fd76d4a7a25231"
$SUBDOMAIN = "fyrup"
$COMPANY_ID = "0"

$URL = "https://$SUBDOMAIN.simprosuite.com/api/v1.0/companies/$COMPANY_ID/jobs/?pageSize=250&columns=ID,Status"

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

Write-Host "Fetching job status values..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $URL -Method Get -Headers $headers
    
    Write-Host "Success! Fetched $($response.Count) jobs" -ForegroundColor Green
    Write-Host ""
    
    # Status is an object with ID, Name, Color - extract Name for grouping
    Write-Host "Status Distribution:" -ForegroundColor Yellow
    Write-Host ""
    
    $statusNames = $response | ForEach-Object { $_.Status.Name }
    $statusCounts = $statusNames | Group-Object | Sort-Object -Property Count -Descending
    
    foreach ($status in $statusCounts) {
        $percentage = [math]::Round(($status.Count / $response.Count) * 100, 1)
        Write-Host "  $($status.Name): $($status.Count) jobs - $percentage%" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "Unique Status Names Found:" -ForegroundColor Yellow
    foreach ($status in $statusCounts) {
        Write-Host "  - $($status.Name)" -ForegroundColor Cyan
    }
    
    Write-Host ""
    Write-Host "Sample Jobs (showing Status object structure):" -ForegroundColor Yellow
    $sample = $response | Select-Object -First 5
    foreach ($job in $sample) {
        Write-Host "  Job $($job.ID):" -ForegroundColor Gray
        Write-Host "    Status.Name: $($job.Status.Name)" -ForegroundColor White
        Write-Host "    Status.ID: $($job.Status.ID)" -ForegroundColor White
    }
}
catch {
    $errorMsg = $_.Exception.Message
    Write-Host "ERROR: $errorMsg" -ForegroundColor Red
}

Write-Host ""
