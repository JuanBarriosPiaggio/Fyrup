# Test Scripts

PowerShell scripts for testing Simpro API connectivity and workflow logic.

## Quick Test Scripts

### Redis Customer Count Testing
```powershell
.\test-redis-customer-count.ps1

# Or test production:
$env:TEST_URL = "https://your-app.railway.app"
.\test-redis-customer-count.ps1
```
Tests the Redis-based customer count system:
- Checks current cached count
- Verifies Redis connection
- Tests refresh status endpoint
- Optionally triggers manual refresh
- Validates cache updates

### Quote Follow-up Testing
```powershell
.\test-quote-followup.ps1
```
Tests the quote follow-up workflow logic:
- Fetches quotes from Simpro API
- Filters by status (excludes Accepted/Declined/Lost/Completed)
- Calculates days since issued
- Categorizes by follow-up day (3, 7, 14, 21)
- Shows expected email count for each day

### Invoice Follow-up Testing
```powershell
.\test-invoice-followup.ps1
```
Tests the invoice follow-up workflow logic:
- Fetches invoices from Simpro API
- Filters unpaid invoices (IsPaid: false)
- Calculates days since issued
- Categorizes by follow-up day (3, 7, 14, 21)
- Shows expected email count for each day

## All Test Scripts

| Script | Purpose |
|--------|---------|
| `test-redis-customer-count.ps1` | ✅ Test Redis customer count system |
| `test-quote-followup.ps1` | ✅ Test quote follow-up logic |
| `test-invoice-followup.ps1` | ✅ Test invoice follow-up logic |
| `test-simpro-api.ps1` | Basic API connectivity test |
| `test-customer-api.ps1` | Test customer endpoint |
| `test-all-quotes-pagination.ps1` | Test quote pagination |
| `test-quote-dates.ps1` | Test quote date fields |
| `test-all-quote-fields.ps1` | Test all quote data fields |
| `test-all-emails.ps1` | Test email retrieval |
| `test-contact-direct.ps1` | Test direct contact access |
| `test-follow-href.ps1` | Test following _href links |
| `test-emails-in-bulk.ps1` | Test bulk email fetching |
| `test-find-overdue.ps1` | Test overdue detection logic |
| `test-quotes-with-duedate.ps1` | Test quote due date calculation |
| `test-bulk-api.ps1` | Test bulk API calls |
| `test-bulk-with-columns.ps1` | Test column filtering |
| `test-correct-endpoints.ps1` | Validate API endpoints |
| `test-full-structure.ps1` | Test complete data structure |
| `test-raw-bulk-data.ps1` | Test raw data retrieval |

## Configuration

All scripts use your Simpro API credentials:
- **API Token:** Set in each script
- **Subdomain:** `fyrup`
- **Company ID:** `0`

## Usage Notes

- Run from PowerShell 5.1 or later
- Requires internet connection
- Tests against live Simpro data
- Safe to run (read-only operations)
- No emails are actually sent

## Output

Each script shows:
- API response status
- Data retrieved
- Filtering results
- Expected behavior for workflows
