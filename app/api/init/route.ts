import { NextResponse } from 'next/server';
import { initCustomerCount } from '@/lib/init-customer-count';

/**
 * Initialization endpoint
 * Call this after deployment or on app startup to initialize Redis cache
 * Can be triggered manually or via deployment hook
 */
export async function GET() {
  try {
    console.log('🚀 Running app initialization...');

    // Initialize customer count (checks Redis and triggers refresh if empty)
    await initCustomerCount();

    return NextResponse.json({
      success: true,
      message: 'Initialization completed',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Initialization error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Initialization failed',
        details: error.message
      },
      { status: 500 }
    );
  }
}
