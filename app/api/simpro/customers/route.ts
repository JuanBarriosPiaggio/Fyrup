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
        console.log(`Returning cached customer count: ${cachedCount} (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`);
        return NextResponse.json({ 
          count: cachedCount,
          cached: true,
          cacheAge: Math.round(cacheAge / 1000 / 60) // in minutes
        });
      }
    }

    // Fetch fresh data from Simpro API
    console.log('Fetching fresh customer count from Simpro API...');
    
    // Fetch customers without the columns parameter (it's not supported)
    const response = await fetch(
      `${SIMPRO_API_URL}/companies/${COMPANY_ID}/customers/?pageSize=1000`,
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

    const data = await response.json();
    const customerCount = Array.isArray(data) ? data.length : 0;

    // Update cache
    cachedCount = customerCount;
    cacheTimestamp = now;

    console.log(`Fresh customer count fetched: ${customerCount}`);

    return NextResponse.json({ 
      count: customerCount,
      cached: false
    });

  } catch (error: any) {
    console.error('Customer count API error:', error);
    
    // If we have a cached count, return it even if expired
    if (cachedCount !== null) {
      console.log('API error, returning stale cached count');
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
