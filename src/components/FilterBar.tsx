'use client';

import React from 'react';
import { NewsCategory, SentimentType } from '@/types';
import { Filter, ArrowUpDown, X, Tag } from 'lucide-react';

interface FilterBarProps {
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  activeSentiment: 'all' | SentimentType;
  onSelectSentiment: (sent: 'all' | SentimentType) => void;
  activeTicker: string | null;
  onClearTicker: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  sortBy: string;
  onSelectSort: (sort: 'latest' | 'sentiment-bullish' | 'sentiment-bearish') => void;
  totalArticles: number;
}

const CATEGORIES: { label: string; value: NewsCategory }[] = [
  { label: 'All DSE News', value: 'all' },
  { label: 'Banks & NBFIs', value: 'banking' },
  { label: 'Pharma & Chemicals', value: 'pharma' },
  { label: 'Telecom & Tech', value: 'telecom' },
  { label: 'Fuel & Power', value: 'fuel_power' },
  { label: 'Textile & RMG', value: 'textile' },
  { label: 'Macro & Remittance', value: 'macro' },
  { label: 'BSEC & Regulatory', value: 'regulatory' },
];

export function FilterBar({
  activeCategory,
  onSelectCategory,
  activeSentiment,
  onSelectSentiment,
  activeTicker,
  onClearTicker,
  searchQuery,
  onClearSearch,
  sortBy,
  onSelectSort,
  totalArticles,
}: FilterBarProps) {
  const hasActiveFilters = activeTicker || searchQuery || activeSentiment !== 'all' || activeCategory !== 'all';

  return (
    <div className="space-y-3">
      {/* Category Tabs */}
      <div className="flex items-center overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        <div className="flex space-x-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`whitespace-nowrap px-3.5 py-2 text-xs font-semibold transition border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-950/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Active Filters readout */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-slate-400">
            Showing <strong className="text-white">{totalArticles}</strong> DSE stories
          </span>

          {activeTicker && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-300">
              <Tag className="h-3 w-3 mr-1" />
              <span>{activeTicker}</span>
              <button
                onClick={onClearTicker}
                className="ml-1 hover:text-white"
                title="Clear ticker filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs text-slate-200">
              <span>Query: "{searchQuery}"</span>
              <button
                onClick={onClearSearch}
                className="ml-1 hover:text-white"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {activeSentiment !== 'all' && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs font-semibold capitalize text-slate-200">
              <span>Sentiment: {activeSentiment}</span>
              <button
                onClick={() => onSelectSentiment('all')}
                className="ml-1 hover:text-white"
                title="Reset sentiment"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={() => {
                onClearTicker();
                onClearSearch();
                onSelectSentiment('all');
                onSelectCategory('all');
              }}
              className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-2 ml-1"
            >
              Reset all
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="rounded-lg border border-slate-800 bg-[#0f172a] px-2.5 py-1 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
          >
            <option value="latest">Latest First</option>
            <option value="sentiment-bullish">Most Bullish</option>
            <option value="sentiment-bearish">Most Bearish</option>
          </select>
        </div>
      </div>
    </div>
  );
}
