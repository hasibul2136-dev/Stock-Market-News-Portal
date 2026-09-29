import { NextResponse } from 'next/server';
import { INITIAL_INDICES, INITIAL_STOCKS, getMarketStatus } from '@/lib/market-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const marketStatus = getMarketStatus();

    return NextResponse.json({
      success: true,
      marketStatus,
      indices: INITIAL_INDICES,
      stocks: INITIAL_STOCKS,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/stocks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
