import { NextResponse } from 'next/server';
import { fetchLiveNews } from '@/lib/feeds';
import { NewsCategory, SentimentType } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory | 'all' | null;
    const sentiment = searchParams.get('sentiment') as SentimentType | 'all' | null;
    const ticker = searchParams.get('ticker');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'latest';

    let articles = await fetchLiveNews();

    // Filter by Category
    if (category && category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }

    // Filter by Sentiment
    if (sentiment && sentiment !== 'all') {
      articles = articles.filter(a => a.sentiment === sentiment);
    }

    // Filter by Ticker
    if (ticker) {
      const upperTicker = ticker.toUpperCase();
      articles = articles.filter(a => 
        a.tickers.includes(upperTicker) ||
        a.title.toUpperCase().includes(upperTicker) ||
        a.summary.toUpperCase().includes(upperTicker)
      );
    }

    // Search query
    if (search) {
      const q = search.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.summary.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.tickers.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'sentiment-bullish') {
      articles.sort((a, b) => b.sentimentScore - a.sentimentScore);
    } else if (sortBy === 'sentiment-bearish') {
      articles.sort((a, b) => a.sentimentScore - b.sentimentScore);
    } else {
      // Default: latest
      articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      data: articles,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news feed' },
      { status: 500 }
    );
  }
}
