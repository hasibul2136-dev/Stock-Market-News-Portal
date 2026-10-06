'use client';

import React from 'react';
import { NewsCategory, SentimentType } from '@/types';
import { Filter, ArrowUpDown, X, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t, toBnNum, isBangla } = useLanguage();
  const hasActiveFilters = activeTicker || searchQuery || activeSentiment !== 'all' || activeCategory !== 'all';

  const categories: { label: string; value: NewsCategory }[] = [
    { label: t('all_dse_news'), value: 'all' },
    { label: t('banking_nbfi'), value: 'banking' },
    { label: t('pharma_chemicals'), value: 'pharma' },
    { label: t('telecom_tech'), value: 'telecom' },
    { label: t('fuel_power'), value: 'fuel_power' },
    { label: t('textile_rmg'), value: 'textile' },
    { label: t('macro_remittance'), value: 'macro' },
    { label: t('bsec_regulatory'), value: 'regulatory' },
  ];

  return (
    <div className="space-y-3">
      {/* Category Tabs */}
      <div className="flex items-center overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        <div className="flex space-x-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`whitespace-nowrap px-3.5 py-2 text-xs font-semibold transition border-b-2 ${
                  isActive
                    ? 'border-emerald-600 text-emerald-800 bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:bg-emerald-950/40 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-400 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
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
          <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
            {isBangla ? (
              <>মোট <strong className="text-slate-900 dark:text-white font-bold">{toBnNum(totalArticles)}</strong>টি সংবাদ</>
            ) : (
              <>{t('showing_stories')} <strong className="text-slate-900 dark:text-white font-bold">{totalArticles}</strong> {t('dse_stories')}</>
            )}
          </span>

          {activeTicker && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-500/40 bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 px-2.5 py-0.5 text-xs font-mono font-bold">
              <Tag className="h-3 w-3 mr-1" />
              <span>{activeTicker}</span>
              <button
                onClick={onClearTicker}
                className="ml-1 hover:text-emerald-950 dark:hover:text-white"
                title="Clear ticker filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 px-2.5 py-0.5 text-xs">
              <span>{isBangla ? 'অনুসন্ধান: ' : 'Query: '}"{searchQuery}"</span>
              <button
                onClick={onClearSearch}
                className="ml-1 hover:text-slate-950 dark:hover:text-white"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {activeSentiment !== 'all' && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 px-2.5 py-0.5 text-xs font-semibold capitalize">
              <span>{isBangla ? 'সেন্টিমেন্ট: ' : 'Sentiment: '}{isBangla ? (activeSentiment === 'bullish' ? 'বুলিশ' : activeSentiment === 'bearish' ? 'বেয়ারিশ' : 'নিরপেক্ষ') : activeSentiment}</span>
              <button
                onClick={() => onSelectSentiment('all')}
                className="ml-1 hover:text-slate-950 dark:hover:text-white"
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
              className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 underline underline-offset-2 ml-1"
            >
              {t('reset_all')}
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          <span className="text-xs text-slate-600 dark:text-slate-400">{t('sort_by')}</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="rounded-lg border border-slate-300 bg-white text-slate-900 px-2.5 py-1 text-xs shadow-sm transition dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-200 focus:border-emerald-500 focus:outline-none"
          >
            <option value="latest">{t('latest_first')}</option>
            <option value="sentiment-bullish">{t('most_bullish')}</option>
            <option value="sentiment-bearish">{t('most_bearish')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
