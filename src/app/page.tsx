'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NewsArticle, StockQuote, MarketIndex, NewsCategory, SentimentType } from '@/types';
import { Header } from '@/components/Header';
import { TickerMarquee } from '@/components/TickerMarquee';
import { MarketIndicesBar } from '@/components/MarketIndicesBar';
import { BreakingFlash } from '@/components/BreakingFlash';
import { FilterBar } from '@/components/FilterBar';
import { NewsCard } from '@/components/NewsCard';
import { SentimentMeter } from '@/components/SentimentMeter';
import { TradingViewWidget } from '@/components/TradingViewWidget';
import { StockDetailModal } from '@/components/StockDetailModal';
import { BookmarksModal } from '@/components/BookmarksModal';
import { Footer } from '@/components/Footer';
import { INITIAL_INDICES, INITIAL_STOCKS } from '@/lib/market-data';
import { useLanguage } from '@/context/LanguageContext';
import { 
  TrendingUp, 
  Flame, 
  Radio, 
  Calendar, 
  ExternalLink, 
  AlertCircle,
  BarChart3,
  Layers,
  Landmark
} from 'lucide-react';

export default function HomePage() {
  const { isBangla, toBnNum } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [stocks, setStocks] = useState<StockQuote[]>(INITIAL_STOCKS);
  const [indices, setIndices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [marketStatus, setMarketStatus] = useState({
    isOpen: true,
    statusText: 'DSE TRADING OPEN',
    nextEvent: 'Closes at 2:30 PM BST',
  });

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [activeSentiment, setActiveSentiment] = useState<'all' | SentimentType>('all');
  const [activeTicker, setActiveTicker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'sentiment-bullish' | 'sentiment-bearish'>('latest');

  // Stock Detail Modal & Active Focused Ticker
  const [focusedSymbol, setFocusedSymbol] = useState<string>('GP');
  const [selectedStockForModal, setSelectedStockForModal] = useState<StockQuote | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Load Bookmarks from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dsepulse_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveBookmarks = (newBookmarks: NewsArticle[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem('dsepulse_bookmarks', JSON.stringify(newBookmarks));
    } catch {
      // Ignore
    }
  };

  const toggleBookmark = (article: NewsArticle) => {
    const exists = bookmarks.some(b => b.id === article.id);
    if (exists) {
      saveBookmarks(bookmarks.filter(b => b.id !== article.id));
    } else {
      saveBookmarks([...bookmarks, article]);
    }
  };

  // Fetch News Feed
  const fetchNews = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (activeSentiment !== 'all') params.append('sentiment', activeSentiment);
      if (activeTicker) params.append('ticker', activeTicker);
      if (searchQuery) params.append('search', searchQuery);
      if (sortBy) params.append('sortBy', sortBy);

      const res = await fetch(`/api/news?${params.toString()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setArticles(json.data);
      }
    } catch (err) {
      console.error('Error fetching DSE news:', err);
    } finally {
      setLoading(false);
      if (isManualRefresh) setIsRefreshing(false);
    }
  }, [activeCategory, activeSentiment, activeTicker, searchQuery, sortBy]);

  // Fetch Stock Quotes
  const fetchStocks = useCallback(async () => {
    try {
      const res = await fetch('/api/stocks');
      const json = await res.json();
      if (json.success) {
        if (json.stocks) setStocks(json.stocks);
        if (json.indices) setIndices(json.indices);
        if (json.marketStatus) setMarketStatus(json.marketStatus);
      }
    } catch (err) {
      console.error('Error fetching DSE prices:', err);
    }
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    fetchNews();
    fetchStocks();
  }, [fetchNews, fetchStocks]);

  // Periodic Live Price Fluctuation (every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStocks();
    }, 6000);
    return () => clearInterval(interval);
  }, [fetchStocks]);

  // Handle Ticker Selection
  const handleSelectTicker = (symbol: string) => {
    const cleanSymbol = symbol.replace('$', '').toUpperCase();
    setFocusedSymbol(cleanSymbol);
    const found = stocks.find(s => s.symbol === cleanSymbol);
    const foundIdx = indices.find(i => i.symbol.toUpperCase() === cleanSymbol || (cleanSymbol === 'USDBDT' && i.symbol.includes('BDT')) || (cleanSymbol.includes('CALL') && i.symbol.includes('CALL')));

    if (found) {
      setSelectedStockForModal(found);
    } else if (foundIdx) {
      setSelectedStockForModal({
        symbol: foundIdx.symbol,
        name: foundIdx.name,
        category: foundIdx.symbol.includes('CALL') ? 'Macro Benchmark Rate' : foundIdx.symbol.includes('BDT') ? 'Forex Currency' : 'Market Index',
        price: foundIdx.price,
        change: foundIdx.change,
        changePercent: foundIdx.changePercent,
        high: +(foundIdx.price * 1.01).toFixed(2),
        low: +(foundIdx.price * 0.99).toFixed(2),
        volume: foundIdx.symbol.includes('CALL') ? 'Interbank Market' : foundIdx.symbol.includes('BDT') ? 'Bangladesh Bank' : '৳650+ Cr',
        marketCap: foundIdx.symbol.includes('CALL') ? 'Central Bank Policy' : 'DSE Market',
        sparkline: foundIdx.sparkline,
      });
    } else {
      setSelectedStockForModal({
        symbol: cleanSymbol,
        name: `${cleanSymbol} PLC`,
        category: 'DSE Listed Company',
        price: 120.00,
        change: 1.50,
        changePercent: 1.26,
        high: 122.00,
        low: 119.00,
        volume: '850K',
        marketCap: '৳2,450 Cr',
        sparkline: [118, 119, 119.5, 120, 120.8, 120],
      });
    }
    setIsStockModalOpen(true);
  };

  const handleFilterByTicker = (symbol: string) => {
    const cleanSymbol = symbol.replace('$', '').toUpperCase();
    setActiveTicker(cleanSymbol);
  };

  const breakingArticle = useMemo(() => {
    return articles.length > 0 ? articles[0] : null;
  }, [articles]);

  const bookmarkedIds = useMemo(() => new Set(bookmarks.map(b => b.id)), [bookmarks]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-[#090d16] dark:text-slate-100">
      {/* 1. Portal Header */}
      <Header
        onSearch={(q) => setSearchQuery(q)}
        onRefresh={() => fetchNews(true)}
        isRefreshing={isRefreshing}
        bookmarkedCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        marketStatus={marketStatus}
      />

      {/* 2. Real-time Ticker Marquee Ribbon */}
      <TickerMarquee
        stocks={stocks}
        onSelectTicker={handleSelectTicker}
      />

      {/* 3. DSE & National Financial Indices Bar */}
      <MarketIndicesBar
        indices={indices}
        onSelectIndex={(sym) => {
          if (sym === 'USD / BDT') handleSelectTicker('USDBDT');
          else handleSelectTicker(sym);
        }}
      />

      {/* 4. Breaking News Flash Alert */}
      <BreakingFlash
        article={breakingArticle}
        onSelectArticle={(art) => {
          if (art.tickers.length > 0) {
            handleSelectTicker(art.tickers[0]);
          }
        }}
      />

      {/* 5. Main Dashboard Body */}
      <main className="mx-auto w-full max-w-[1920px] flex-1 px-4 py-3 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* LEFT COLUMNS: News Feed & Filter Toolbar */}
          <div className="space-y-4 lg:col-span-8 xl:col-span-8 2xl:col-span-9">
            <FilterBar
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              activeSentiment={activeSentiment}
              onSelectSentiment={(sent) => setActiveSentiment(sent)}
              activeTicker={activeTicker}
              onClearTicker={() => setActiveTicker(null)}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              sortBy={sortBy}
              onSelectSort={(sort) => setSortBy(sort)}
              totalArticles={articles.length}
            />

            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-48 animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/40"
                  />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-[#0d131f]">
                <AlertCircle className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-300">
                  {isBangla ? 'কোনো ডিএসই সংবাদ পাওয়া যায়নি' : 'No matching DSE market intelligence found'}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {isBangla ? 'ফিল্টার, কোম্পানির ট্যাগ বা অনুসন্ধানের শব্দ পরিবর্তন করে চেষ্টা করুন।' : 'Try clearing your active category filters, company tags, or search query.'}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSentiment('all');
                    setActiveTicker(null);
                    setSearchQuery('');
                  }}
                  className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow"
                >
                  {isBangla ? 'সব ফিল্টার মুছুন' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {articles.map((art) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    isBookmarked={bookmarkedIds.has(art.id)}
                    onToggleBookmark={toggleBookmark}
                    onSelectTicker={handleSelectTicker}
                    onSelectCategory={(cat) => setActiveCategory(cat)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMNS: Financial Rail & Interactive Widgets */}
          <div className="space-y-4 lg:col-span-4 xl:col-span-4 2xl:col-span-3">
            
            {/* 1. Market Sentiment Gauge */}
            <SentimentMeter
              articles={articles}
              onSelectSentiment={(s) => setActiveSentiment(s)}
              activeSentiment={activeSentiment}
            />

            {/* 2. Interactive TradingView Chart for Focused DSE Ticker */}
            <TradingViewWidget symbol={focusedSymbol} height={360} />

            {/* 3. Most Active DSE Equities */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-[#0d131f]/90">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Flame className="h-4 w-4 text-emerald-500" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {isBangla ? 'ডিএসই শীর্ষ লেনদেনকৃত শেয়ার' : 'Top Traded DSE Equities'}
                </h4>
              </div>

              <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800/60">
                {stocks.slice(0, 6).map((stock) => {
                  const isPositive = stock.change >= 0;
                  return (
                    <div
                      key={stock.symbol}
                      onClick={() => handleSelectTicker(stock.symbol)}
                      className="group flex items-center justify-between py-2.5 cursor-pointer transition hover:bg-slate-50 dark:hover:bg-slate-800/40 px-1 rounded"
                    >
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono text-xs font-bold text-slate-800 group-hover:text-emerald-600 dark:text-slate-200 dark:group-hover:text-emerald-400">
                            {stock.symbol}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                            {stock.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          {isBangla ? 'ভলিউম: ' : 'Vol: '}{toBnNum(stock.volume)}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                          ৳{toBnNum(stock.price.toFixed(2))}
                        </div>
                        <div
                          className={`font-mono text-[10px] font-semibold ${
                            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isPositive ? '+' : '-'}
                          {toBnNum(Math.abs(stock.changePercent).toFixed(2))}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Bangladesh Macro & Corporate Radar */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-[#0d131f]/90">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Landmark className="h-4 w-4 text-emerald-500" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {isBangla ? 'বাংলাদেশ অর্থনৈতিক বার্তা' : 'Bangladesh Economic Radar'}
                </h4>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-slate-900/50">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {isBangla ? 'বাংলাদেশ ব্যাংক রেপো রেট' : 'BB Repo Policy Rate'}
                    </span>
                    <span>{isBangla ? 'বর্তমান: ১০.০০%' : 'Current: 10.00%'}</span>
                  </div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                    {isBangla 
                      ? 'মুদ্রাস্ফীতি নিয়ন্ত্রণে বাংলাদেশ ব্যাংকের নীতি সুদহার ১০ শতাংশে বহাল রয়েছে।' 
                      : 'Bangladesh Bank policy rate anchored to control food and non-food CPI inflation.'}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-slate-900/50">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {isBangla ? 'রিজার্ভ ও রেমিট্যান্স' : 'Forex Reserves & Remittance'}
                    </span>
                    <span>{isBangla ? 'রিজার্ভ: ২০.৪ বিলিয়ন ডলার' : 'Reserves: $20.4B'}</span>
                  </div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                    {isBangla 
                      ? 'মাসিক রেমিট্যান্স প্রবাহ ২.১ বিলিয়ন ডলার ছাড়িয়েছে, যা বৈদেশিক মুদ্রার রিজার্ভে ভারসাম্য আনছে।' 
                      : 'Remittance inflows cross $2.1B monthly mark, reinforcing balance of payments stability.'}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-slate-900/50">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {isBangla ? 'ডিএসই দৈনিক গড় লেনদেন' : 'DSE Daily Market Turnover'}
                    </span>
                    <span>{isBangla ? 'গড়: ৬৫০+ কোটি টাকা' : 'Avg: ৳650+ Crore'}</span>
                  </div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                    {isBangla 
                      ? 'ব্যাংকিং, ওষুধ এবং টেলিযোগাযোগ খাতে প্রাতিষ্ঠানিক বিনিয়োগ বৃদ্ধি পাচ্ছে।' 
                      : 'Institutional participation surges across banking, pharmaceuticals, and telecommunications.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Stock Detail Modal */}
      <StockDetailModal
        stock={selectedStockForModal}
        articles={articles}
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onFilterByTicker={handleFilterByTicker}
      />

      {/* 8. Bookmarks Drawer / Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={(id) => saveBookmarks(bookmarks.filter(b => b.id !== id))}
        onClearAll={() => saveBookmarks([])}
        onSelectTicker={handleSelectTicker}
      />
    </div>
  );
}
