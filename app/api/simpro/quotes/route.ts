import { NextRequest, NextResponse } from 'next/server';

const SIMPRO_API_URL = 'https://fyrup.simprosuite.com/api/v1.0';
const SIMPRO_TOKEN = 'c035c60b6a535c7f515627cd15fd76d4a7a25231';
const COMPANY_ID = '0';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateFilter = searchParams.get('filter') || '30';
    
    const response = await fetch(
      `${SIMPRO_API_URL}/companies/${COMPANY_ID}/quotes/?pageSize=250&columns=ID,DateIssued,Status,Total,Customer`,
      {
        headers: {
          'Authorization': `Bearer ${SIMPRO_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store' // Disable caching for real-time data
      }
    );

    if (!response.ok) {
      throw new Error(`Simpro API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter by date range
    const startDate = getStartDate(dateFilter);
    const filteredData = data.filter((quote: any) => {
      const issueDate = new Date(quote.DateIssued);
      return issueDate >= startDate;
    });

    return NextResponse.json(filteredData);
  } catch (error: any) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes', details: error.message },
      { status: 500 }
    );
  }
}

function getStartDate(filter: string): Date {
  const today = new Date();
  const startDate = new Date(today);
  
  switch(filter) {
    case '7':
      startDate.setDate(today.getDate() - 7);
      break;
    case '30':
      startDate.setDate(today.getDate() - 30);
      break;
    case '90':
      startDate.setDate(today.getDate() - 90);
      break;
    default:
      startDate.setDate(today.getDate() - 30);
  }
  
  return startDate;
}
