'use client';

import React from 'react';
import { StockQuote, NewsArticle } from '@/types';
import { TradingViewWidget } from './TradingViewWidget';
import { X, ArrowUpRight, ArrowDownRight, ExternalLink, Filter } from 'lucide-react';

interface StockDetailModalProps {
  stock: StockQuote | null;
  articles: NewsArticle[];
  isOpen: boolean;
  onClose: () => void;
  onFilterByTicker: (symbol: string) => void;
}

export function StockDetailModal({
  stock,
  articles,
  isOpen,
  onClose,
  onFilterByTicker,
}: StockDetailModalProps) {
  if (!isOpen || !stock) return null;

  const isPositive = stock.change >= 0;
  const relatedArticles = articles.filter(a =>
    a.tickers.includes(stock.symbol) ||
    a.title.toUpperCase().includes(stock.symbol) ||
    a.summary.toUpperCase().includes(stock.symbol)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-colors duration-200 dark:border-slate-700 dark:bg-[#0b101b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                {stock.symbol}
              </h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stock.name}
              </span>
              <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800">
                DSE / BANGLADESH
              </span>
            </div>

            <div className="mt-2 flex items-baseline space-x-3">
              <span className="font-mono text-3xl font-extrabold text-slate-900 dark:text-white">
                ৳{stock.price.toFixed(2)}
              </span>
              <span
                className={`flex items-center font-mono text-sm font-bold ${
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
                {stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onFilterByTicker(stock.symbol);
                onClose();
              }}
              className="flex items-center space-x-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Filter Portal By {stock.symbol}</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-[#0f172a]/60">
            <span className="text-[10px] uppercase text-slate-500">Day Range</span>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              ৳{stock.low.toFixed(2)} - ৳{stock.high.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-[#0f172a]/60">
            <span className="text-[10px] uppercase text-slate-500">Traded Volume</span>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              {stock.volume}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-[#0f172a]/60">
            <span className="text-[10px] uppercase text-slate-500">Market Cap</span>
            <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              {stock.marketCap || 'N/A'}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800/80 dark:bg-[#0f172a]/60">
            <span className="text-[10px] uppercase text-slate-500">Sector</span>
            <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {stock.category || 'DSE Equity'}
            </p>
          </div>
        </div>

        {/* Interactive Chart */}
        <div className="mt-4">
          <TradingViewWidget symbol={stock.symbol} height={320} />
        </div>

        {/* Specific News for this Ticker */}
        <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
            Recent DSE Intelligence & Disclosures for {stock.symbol}
          </h4>

          {relatedArticles.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No direct corporate disclosures tagged for {stock.symbol} in recent feeds. Click "Filter Portal" to search broader mentions.
            </p>
          ) : (
            <div className="space-y-2">
              {relatedArticles.slice(0, 3).map(art => (
                <div 
                  key={art.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-slate-300 dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-slate-700"
                >
                  <div className="pr-4">
                    <span className="text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-bold mr-2">
                      {art.source}
                    </span>
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-800 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400 transition"
                    >
                      {art.title}
                    </a>
                  </div>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
