import { NextResponse } from 'next/server';

const SIMPRO_API_URL = process.env.SIMPRO_API_URL;
const SIMPRO_TOKEN = process.env.SIMPRO_API_TOKEN;
const COMPANY_ID = process.env.SIMPRO_COMPANY_ID;

// Cache configuration
let cachedCount: number | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    // Check if we have a valid cached count
    const now = Date.now();
    if (cachedCount !== null && cacheTimestamp !== null) {
      const cacheAge = now - cacheTimestamp;
      if (cacheAge < CACHE_DURATION) {
        console.log(`💾 Returning cached customer count: ${cachedCount} unique customers (cache age: ${Math.round(cacheAge / 1000 / 60)} minutes)`);
        return NextResponse.json({ 
          count: cachedCount,
          cached: true,
          cacheAge: Math.round(cacheAge / 1000 / 60) // in minutes
        });
      }
    }

    // Fetch fresh data from Simpro API
    console.log('🔄 Fetching customer count from invoices (fast mode - 2 pages max)...');
    
    // Since the /customers/ endpoint isn't available, we'll derive unique customers from invoices
    // For performance: We only fetch first 2 pages (500 invoices) to keep load time under 2-3 seconds
    // This gives us a good representative sample of unique customers
    // Note: Simpro API has a maximum pageSize of 250 according to swagger
    
    const uniqueCustomerIds = new Set();
    let page = 1;
    const MAX_PAGES = 2; // Limit to 2 pages for speed (500 invoices)
    let totalInvoices = 0;
    
    while (page <= MAX_PAGES) {
      console.log(`  📄 Fetching page ${page}/${MAX_PAGES}...`);
      
      const response = await fetch(
        `${SIMPRO_API_URL}/companies/${COMPANY_ID}/invoices/?pageSize=250&page=${page}&columns=ID,Customer`,
        {
          headers: {
            'Authorization': `Bearer ${SIMPRO_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          cache: 'no-store'
        }
      );

      if (!response.ok) {
        throw new Error(`Simpro API error: ${response.status} ${response.statusText}`);
      }

      const invoices = await response.json();
      
      // Count unique customers from this page
      if (Array.isArray(invoices)) {
        totalInvoices += invoices.length;
        
        invoices.forEach((invoice: any) => {
          if (invoice.Customer && invoice.Customer.ID) {
            uniqueCustomerIds.add(invoice.Customer.ID);
          }
        });
        
        console.log(`  ✓ Page ${page}: ${invoices.length} invoices, ${uniqueCustomerIds.size} unique customers so far`);
        
        // If we got less than 250 results, we've reached the last page
        if (invoices.length < 250) {
          console.log(`  ℹ️  Reached last page (only ${invoices.length} invoices on this page)`);
          break;
        }
        
        page++;
      } else {
        break;
      }
    }
    
    const customerCount = uniqueCustomerIds.size;

    // Update cache
    cachedCount = customerCount;
    cacheTimestamp = now;

    console.log(`✅ SAMPLE: ${totalInvoices} invoices processed → ${customerCount} unique customers found`);
    console.log(`   Note: Limited to ${MAX_PAGES} pages for performance (full count would take longer)`);
    console.log(`   Display will show: "${formatCustomerCount(customerCount)}"`);
    
    // Helper function to show what will be displayed
    function formatCustomerCount(count: number): string {
      if (count >= 1000) {
        const thousands = Math.floor(count / 100) * 100;
        return `${(thousands / 1000).toFixed(0)}k+`;
      } else if (count >= 100) {
        const hundreds = Math.floor(count / 100) * 100;
        return `${hundreds}+`;
      } else if (count >= 50) {
        const rounded = Math.floor(count / 50) * 50;
        return `${rounded}+`;
      } else {
        return `${count}+`;
      }
    }

    return NextResponse.json({ 
      count: customerCount,
      cached: false
    });

  } catch (error: any) {
    console.error('Customer count API error:', error);
    
    // If we have a cached count, return it even if expired
    if (cachedCount !== null) {
      console.log(`⚠️  API error, returning stale cached count: ${cachedCount} unique customers`);
      return NextResponse.json({ 
        count: cachedCount,
        cached: true,
        stale: true
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch customer count', details: error.message },
      { status: 500 }
    );
  }
}
