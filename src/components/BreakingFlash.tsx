'use client';

import React from 'react';
import { NewsArticle } from '@/types';
import { AlertCircle, ExternalLink, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateHeadline } from '@/lib/translator';

interface BreakingFlashProps {
  article: NewsArticle | null;
  onSelectArticle: (article: NewsArticle) => void;
}

export function BreakingFlash({ article, onSelectArticle }: BreakingFlashProps) {
  const { t, isBangla } = useLanguage();

  if (!article) return null;

  const displayTitle = isBangla ? translateHeadline(article.title) : article.title;

  return (
    <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12 mb-3">
      <div className="relative overflow-hidden rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-rose-50/50 p-3 shadow-sm dark:border-rose-500/30 dark:bg-gradient-to-r dark:from-rose-950/40 dark:via-[#0d131f] dark:to-rose-950/20 dark:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 rounded-full bg-rose-100 text-rose-700 px-2.5 py-1 text-[11px] font-bold border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
              <span>{t('flash_alert')}</span>
            </span>

            <p className="line-clamp-1 font-semibold text-slate-900 text-sm hover:text-emerald-700 dark:text-slate-100 dark:hover:text-cyan-400 cursor-pointer transition"
               onClick={() => onSelectArticle(article)}>
              {displayTitle}
            </p>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
            {article.tickers.length > 0 && (
              <div className="flex space-x-1">
                {article.tickers.map(t => (
                  <span key={t} className="rounded bg-rose-100 text-rose-800 border border-rose-200 px-1.5 py-0.5 font-mono text-[10px] font-bold dark:bg-slate-800 dark:text-cyan-300 dark:border-slate-700">
                    ${t}
                  </span>
                ))}
              </div>
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
            >
              <span>{t('source')}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
