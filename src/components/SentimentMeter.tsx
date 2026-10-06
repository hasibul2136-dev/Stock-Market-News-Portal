'use client';

import React from 'react';
import { NewsArticle } from '@/types';
import { ShieldAlert, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SentimentMeterProps {
  articles: NewsArticle[];
  onSelectSentiment: (sentiment: 'all' | 'bullish' | 'bearish' | 'neutral') => void;
  activeSentiment: string;
}

export function SentimentMeter({ articles, onSelectSentiment, activeSentiment }: SentimentMeterProps) {
  const { t, toBnNum, isBangla } = useLanguage();

  if (!articles || articles.length === 0) return null;

  const total = articles.length;
  const bullishCount = articles.filter(a => a.sentiment === 'bullish').length;
  const bearishCount = articles.filter(a => a.sentiment === 'bearish').length;
  const neutralCount = articles.filter(a => a.sentiment === 'neutral').length;

  const bullishPct = Math.round((bullishCount / total) * 100);
  const bearishPct = Math.round((bearishCount / total) * 100);
  const neutralPct = 100 - bullishPct - bearishPct;

  const netScore = Math.min(100, Math.max(0, Math.round(50 + ((bullishCount - bearishCount) / total) * 50)));

  let sentimentVerdict = t('tone_neutral');
  let verdictColor = 'text-amber-500 dark:text-amber-400';
  if (netScore >= 65) {
    sentimentVerdict = t('tone_greed');
    verdictColor = 'text-emerald-600 dark:text-emerald-400';
  } else if (netScore >= 55) {
    sentimentVerdict = t('tone_mild_bullish');
    verdictColor = 'text-emerald-600 dark:text-emerald-300';
  } else if (netScore <= 35) {
    sentimentVerdict = t('tone_fear');
    verdictColor = 'text-rose-600 dark:text-rose-400';
  } else if (netScore <= 45) {
    sentimentVerdict = t('tone_mild_bearish');
    verdictColor = 'text-rose-600 dark:text-rose-300';
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-[#0d131f]/90">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {t('sentiment_meter_title')}
          </h4>
        </div>
        <span className={`font-mono text-xs font-bold ${verdictColor}`}>
          {toBnNum(netScore)}/{toBnNum(100)}
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-500 dark:text-slate-400">{t('market_tone')}</span>
          <span className={`font-semibold ${verdictColor}`}>{sentimentVerdict}</span>
        </div>

        {/* Multi-segmented Bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            style={{ width: `${bullishPct}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`${isBangla ? 'বুলিশ' : 'Bullish'}: ${toBnNum(bullishPct)}%`}
          />
          <div
            style={{ width: `${neutralPct}%` }}
            className="bg-slate-400 dark:bg-slate-500 transition-all duration-500"
            title={`${isBangla ? 'নিরপেক্ষ' : 'Neutral'}: ${toBnNum(neutralPct)}%`}
          />
          <div
            style={{ width: `${bearishPct}%` }}
            className="bg-rose-500 transition-all duration-500"
            title={`${isBangla ? 'বেয়ারিশ' : 'Bearish'}: ${toBnNum(bearishPct)}%`}
          />
        </div>

        {/* Interactive Breakdown Filter Buttons */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button
            onClick={() => onSelectSentiment(activeSentiment === 'bullish' ? 'all' : 'bullish')}
            className={`flex flex-col items-center rounded-lg border p-2 transition ${
              activeSentiment === 'bullish'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              <span className="font-mono text-xs font-bold">{toBnNum(bullishPct)}%</span>
            </div>
            <span className="text-[10px]">{isBangla ? 'বুলিশ' : 'Bullish'} ({toBnNum(bullishCount)})</span>
          </button>

          <button
            onClick={() => onSelectSentiment(activeSentiment === 'neutral' ? 'all' : 'neutral')}
            className={`flex flex-col items-center rounded-lg border p-2 transition ${
              activeSentiment === 'neutral'
                ? 'border-slate-400 bg-slate-100 text-slate-800 dark:bg-slate-800/60 dark:text-slate-200'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300">
              <span className="font-mono text-xs font-bold">{toBnNum(neutralPct)}%</span>
            </div>
            <span className="text-[10px]">{isBangla ? 'নিরপেক্ষ' : 'Neutral'} ({toBnNum(neutralCount)})</span>
          </button>

          <button
            onClick={() => onSelectSentiment(activeSentiment === 'bearish' ? 'all' : 'bearish')}
            className={`flex flex-col items-center rounded-lg border p-2 transition ${
              activeSentiment === 'bearish'
                ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-1 text-rose-600 dark:text-rose-400">
              <TrendingDown className="h-3 w-3" />
              <span className="font-mono text-xs font-bold">{toBnNum(bearishPct)}%</span>
            </div>
            <span className="text-[10px]">{isBangla ? 'বেয়ারিশ' : 'Bearish'} ({toBnNum(bearishCount)})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
