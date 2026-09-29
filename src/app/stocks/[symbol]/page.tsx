'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { INITIAL_STOCKS } from '@/lib/market-data';
import { COMPANY_PROFILES } from '@/lib/company-data';
import { TradingViewWidget } from '@/components/TradingViewWidget';
import { NewsArticle } from '@/types';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  TrendingUp, 
  Layers, 
  Calendar, 
  Share2, 
  Bookmark, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Percent,
  DollarSign,
  BarChart3,
  Users
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = (params?.symbol as string || 'GP').toUpperCase();

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find stock quote
  const stock = useMemo(() => {
    return INITIAL_STOCKS.find(s => s.symbol === symbol) || {
      symbol,
      name: `${symbol} PLC`,
      category: 'DSE Listed Company',
      price: 242.40,
      change: -1.10,
      changePercent: -0.45,
      high: 244.00,
      low: 242.00,
      volume: '890K',
      marketCap: '৳15,000 Cr',
      sparkline: [243, 244, 243.5, 242.8, 242.40],
    };
  }, [symbol]);

  // Find fundamentals profile
  const profile = useMemo(() => {
    return COMPANY_PROFILES[symbol] || {
      symbol,
      name: stock.name,
      sector: stock.category || 'General',
      category: 'A' as const,
      pe: 12.5,
      eps: 18.20,
      nav: 65.40,
      dividendYield: '4.50%',
      paidUpCap: '৳850.00 Cr',
      marketCap: stock.marketCap || '৳10,000 Cr',
      sharesOutstanding: '850.00M',
      fiftyTwoWeekRange: '৳180.00 - ৳280.00',
      auditedDividend: '50% Cash',
      authorizedCapital: '৳1,500.00 Cr',
      yearEnd: 'December 31',
      listingYear: 2005,
      about: `${stock.name} is a publicly traded company on the Dhaka Stock Exchange (DSE).`,
      peers: [],
    };
  }, [symbol, stock]);

  // Fetch news
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setArticles(data.data.filter((a: NewsArticle) => 
            a.tickers.includes(symbol) || 
            a.title.toUpperCase().includes(symbol) || 
            a.summary.toUpperCase().includes(symbol)
          ));
        }
      })
      .catch(() => {});
  }, [symbol]);

  const isPositive = stock.change >= 0;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-[#090d16] dark:text-slate-100">
      {/* Top Navigation */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#0d131f]/90 sticky top-0 z-30">
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portal</span>
            </Link>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-emerald-600">Home</Link>
              <span>/</span>
              <span>DSE Equities</span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">{symbol}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
        {/* Company Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0d131f]/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-mono text-3xl font-extrabold text-slate-900 dark:text-white">
                  {stock.symbol}
                </h1>
                <span className="rounded bg-emerald-100 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
                  Category {profile.category}
                </span>
                <span className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {profile.sector}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-500 dark:bg-slate-800">
                  Listed {profile.listingYear}
                </span>
              </div>
              <p className="mt-1 text-base text-slate-600 dark:text-slate-400 font-medium">
                {stock.name}
              </p>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline space-x-3 text-right">
              <div>
                <div className="font-mono text-4xl font-black text-slate-900 dark:text-white">
                  ৳{stock.price.toFixed(2)}
                </div>
                <div
                  className={`flex items-center justify-end font-mono text-sm font-bold ${
                    isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="mr-0.5 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-0.5 h-4 w-4" />
                  )}
                  {isPositive ? '+' : ''}
                  ৳{stock.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%) Today
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 border-t border-slate-100 dark:border-slate-800 pt-4">
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">Day High / Low</span>
              <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                ৳{stock.low.toFixed(2)} - ৳{stock.high.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">52-Week Range</span>
              <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                {profile.fiftyTwoWeekRange}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">P/E Ratio</span>
              <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {profile.pe.toFixed(1)}x
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">EPS (TTM)</span>
              <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                ৳{profile.eps.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">NAV Per Share</span>
              <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                ৳{profile.nav.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">Dividend Yield</span>
              <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {profile.dividendYield}
              </p>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Left Column: Technical Chart & About */}
          <div className="space-y-6 lg:col-span-8">
            {/* Interactive Technical Chart */}
            <TradingViewWidget symbol={symbol} height={420} />

            {/* About the Company */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0d131f]/90">
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Company Profile & Business Overview
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {profile.about}
              </p>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-500">Paid-up Capital</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{profile.paidUpCap}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-500">Market Capitalization</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{profile.marketCap}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-500">Shares Outstanding</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{profile.sharesOutstanding}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-500">Latest Dividend</span>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{profile.auditedDividend}</div>
                </div>
              </div>
            </div>

            {/* Peer Comparison */}
            {profile.peers && profile.peers.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0d131f]/90">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Sector Peers ({profile.sector})
                </h3>
                <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800/60">
                  {profile.peers.map(peer => (
                    <div key={peer.symbol} className="flex items-center justify-between py-2.5">
                      <div>
                        <Link
                          href={`/stocks/${peer.symbol}`}
                          className="font-mono text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                          {peer.symbol}
                        </Link>
                        <span className="ml-2 text-xs text-slate-500">{peer.name}</span>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">৳{peer.price.toFixed(2)}</span>
                        <span className={peer.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {peer.changePercent >= 0 ? '+' : ''}{peer.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Depth & News */}
          <div className="space-y-6 lg:col-span-4">
            {/* Simulated DSE Market Depth */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0d131f]/90">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">
                Order Book Depth (DSE)
              </h4>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <div className="text-[10px] uppercase text-emerald-600 font-bold mb-1">Buy Orders (Bid)</div>
                  <div className="space-y-1">
                    <div className="flex justify-between bg-emerald-50 p-1 rounded dark:bg-emerald-950/30">
                      <span>৳{(stock.price - 0.10).toFixed(2)}</span>
                      <span className="text-slate-500">12,500</span>
                    </div>
                    <div className="flex justify-between bg-emerald-50 p-1 rounded dark:bg-emerald-950/30">
                      <span>৳{(stock.price - 0.20).toFixed(2)}</span>
                      <span className="text-slate-500">18,200</span>
                    </div>
                    <div className="flex justify-between bg-emerald-50 p-1 rounded dark:bg-emerald-950/30">
                      <span>৳{(stock.price - 0.40).toFixed(2)}</span>
                      <span className="text-slate-500">34,100</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase text-rose-600 font-bold mb-1">Sell Orders (Ask)</div>
                  <div className="space-y-1">
                    <div className="flex justify-between bg-rose-50 p-1 rounded dark:bg-rose-950/30">
                      <span>৳{(stock.price + 0.10).toFixed(2)}</span>
                      <span className="text-slate-500">8,400</span>
                    </div>
                    <div className="flex justify-between bg-rose-50 p-1 rounded dark:bg-rose-950/30">
                      <span>৳{(stock.price + 0.20).toFixed(2)}</span>
                      <span className="text-slate-500">15,600</span>
                    </div>
                    <div className="flex justify-between bg-rose-50 p-1 rounded dark:bg-rose-950/30">
                      <span>৳{(stock.price + 0.50).toFixed(2)}</span>
                      <span className="text-slate-500">22,900</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Intelligence & News */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0d131f]/90">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">
                Recent Intelligence for {symbol}
              </h4>

              <div className="mt-3 space-y-3">
                {articles.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-4 text-center">
                    No dedicated headlines tagged for {symbol} today.
                  </p>
                ) : (
                  articles.map(art => (
                    <div key={art.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/40">
                      <div className="flex items-center space-x-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                        <span>{art.source}</span>
                      </div>
                      <a
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-slate-800 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400 line-clamp-2"
                      >
                        {art.title}
                      </a>
                      <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                        {art.summary}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
