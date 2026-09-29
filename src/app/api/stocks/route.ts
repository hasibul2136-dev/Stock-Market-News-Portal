import { NextResponse } from 'next/server';
import { getMarketStatus } from '@/lib/market-data';
import { getLiveMarketData } from '@/lib/live-crawler';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const marketStatus = getMarketStatus();
    const { indices, stocks, isLive } = await getLiveMarketData();

    return NextResponse.json({
      success: true,
      isLive,
      source: 'Dhaka Stock Exchange (DSE) Live Engine',
      marketStatus,
      indices,
      stocks,
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
