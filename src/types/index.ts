export type SentimentType = 'bullish' | 'bearish' | 'neutral';

export type NewsCategory = 
  | 'all'
  | 'banking'
  | 'pharma'
  | 'telecom'
  | 'fuel_power'
  | 'textile'
  | 'macro'
  | 'regulatory';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
  sentiment: SentimentType;
  sentimentScore: number; // -1.0 to 1.0
  tickers: string[];
  imageUrl?: string;
  readTimeMinutes: number;
}

export interface StockQuote {
  symbol: string;
  name: string;
  category?: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  marketCap?: string;
  sparkline: number[];
  currency?: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

export interface FilterOptions {
  category: NewsCategory;
  sentiment: 'all' | SentimentType;
  ticker: string | null;
  searchQuery: string;
  sortBy: 'latest' | 'sentiment-bullish' | 'sentiment-bearish';
}
