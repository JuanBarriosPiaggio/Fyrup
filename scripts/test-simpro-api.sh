#!/bin/bash

# Test Simpro API Connection
# Replace YOUR-SUBDOMAIN and YOUR-COMPANY-ID with your actual values

echo "Testing Simpro API Connection..."
echo "================================"
echo ""

# Your API Token
TOKEN="c035c60b6a535c7f515627cd15fd76d4a7a25231"

# ✅ Your configuration (ready to test!):
SUBDOMAIN="fyrup"  # ✓ Your subdomain
COMPANY_ID="0"  # ✓ Your Company ID

# Build the URL
URL="https://${SUBDOMAIN}.simprosuite.com/api/v1.0/companies/${COMPANY_ID}/quotes/?pageSize=1"

echo "Testing endpoint: $URL"
echo ""

# Make the API request
curl -X GET "$URL" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "================================"
echo "If you see quote data above, your token works! ✓"
echo "If you see 401 Unauthorized, check your token or Company ID"
echo "If you see 404 Not Found, check your subdomain or Company ID"
