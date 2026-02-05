# Test Redis Customer Count System
# This script tests all the customer count endpoints

$baseUrl = "http://localhost:3000"
if ($env:TEST_URL) {
    $baseUrl = $env:TEST_URL
}

Write-Host "🧪 Testing Redis Customer Count System" -ForegroundColor Cyan
Write-Host "Base URL: $baseUrl" -ForegroundColor Gray
Write-Host ""

# Test 1: Check current count
Write-Host "1️⃣  Testing GET /api/simpro/customers" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/simpro/customers" -Method Get
    Write-Host "   ✅ Success!" -ForegroundColor Green
    Write-Host "   Count: $($response.count)" -ForegroundColor White
    Write-Host "   Cached: $($response.cached)" -ForegroundColor White
    Write-Host "   Source: $($response.source)" -ForegroundColor White
    if ($response.cacheAge) {
        Write-Host "   Cache Age: $($response.cacheAge) minutes" -ForegroundColor White
    }
    if ($response.needsRefresh) {
        Write-Host "   ⚠️  Cache needs refresh!" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "   ❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Check refresh status
Write-Host "2️⃣  Testing GET /api/simpro/customers/refresh (status check)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/simpro/customers/refresh" -Method Get
    Write-Host "   ✅ Success!" -ForegroundColor Green
    
    if ($response.count) {
        Write-Host "   Count: $($response.count)" -ForegroundColor White
        Write-Host "   Last Updated: $($response.lastUpdated)" -ForegroundColor White
        Write-Host "   TTL: $($response.ttl) seconds" -ForegroundColor White
        Write-Host "   Next Refresh: $($response.nextRefresh)" -ForegroundColor White
        Write-Host "   Is Refreshing: $($response.isRefreshing)" -ForegroundColor White
        Write-Host "   Storage: $($response.storage)" -ForegroundColor White
    }
    else {
        Write-Host "   Message: $($response.message)" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "   ❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Ask user if they want to trigger a refresh
Write-Host "3️⃣  Trigger Manual Refresh?" -ForegroundColor Yellow
Write-Host "   ⚠️  This will fetch ALL invoices from Simpro (may take 10-30 seconds)" -ForegroundColor Yellow
$confirm = Read-Host "   Do you want to proceed? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host ""
    Write-Host "   🔄 Triggering refresh..." -ForegroundColor Cyan
    
    try {
        $startTime = Get-Date
        $response = Invoke-RestMethod -Uri "$baseUrl/api/simpro/customers/refresh" -Method Post
        $endTime = Get-Date
        $duration = ($endTime - $startTime).TotalSeconds
        
        Write-Host "   ✅ Success!" -ForegroundColor Green
        Write-Host "   Count: $($response.count)" -ForegroundColor White
        Write-Host "   Total Invoices: $($response.totalInvoices)" -ForegroundColor White
        Write-Host "   Server Duration: $($response.duration) seconds" -ForegroundColor White
        Write-Host "   Client Duration: $([math]::Round($duration, 2)) seconds" -ForegroundColor White
        Write-Host "   Next Refresh: $($response.nextRefresh)" -ForegroundColor White
        Write-Host "   Storage: $($response.storage)" -ForegroundColor White
    }
    catch {
        Write-Host "   ❌ Failed: $_" -ForegroundColor Red
        
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "   Error details: $responseBody" -ForegroundColor Red
        }
    }
    Write-Host ""
    
    # Test 4: Verify the count was updated
    Write-Host "4️⃣  Verifying updated count..." -ForegroundColor Yellow
    Start-Sleep -Seconds 1
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/simpro/customers" -Method Get
        Write-Host "   ✅ Success!" -ForegroundColor Green
        Write-Host "   Count: $($response.count)" -ForegroundColor White
        Write-Host "   Cached: $($response.cached)" -ForegroundColor White
        Write-Host "   Source: $($response.source)" -ForegroundColor White
    }
    catch {
        Write-Host "   ❌ Failed: $_" -ForegroundColor Red
    }
}
else {
    Write-Host "   ⏭️  Skipped refresh" -ForegroundColor Gray
}

Write-Host ""
Write-Host "5️⃣  Testing /api/init endpoint" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/init" -Method Get
    Write-Host "   ✅ Success!" -ForegroundColor Green
    Write-Host "   Message: $($response.message)" -ForegroundColor White
    Write-Host "   Timestamp: $($response.timestamp)" -ForegroundColor White
}
catch {
    Write-Host "   ❌ Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ Testing Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   - Customer count endpoint: GET $baseUrl/api/simpro/customers" -ForegroundColor Gray
Write-Host "   - Refresh status: GET $baseUrl/api/simpro/customers/refresh" -ForegroundColor Gray
Write-Host "   - Trigger refresh: POST $baseUrl/api/simpro/customers/refresh" -ForegroundColor Gray
Write-Host "   - Initialize: GET $baseUrl/api/init" -ForegroundColor Gray
Write-Host ""
