'use client';

import React from 'react';
import { NewsArticle, SentimentType } from '@/types';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Bookmark, 
  Share2, 
  Clock, 
  ExternalLink,
  Tag
} from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onSelectTicker: (ticker: string) => void;
  onSelectCategory: (category: any) => void;
}

function SentimentBadge({ sentiment, score }: { sentiment: SentimentType; score: number }) {
  if (sentiment === 'bullish') {
    return (
      <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-400">
        <TrendingUp className="h-3 w-3" />
        <span>BULLISH</span>
        <span className="opacity-80">+{Math.abs(score).toFixed(2)}</span>
      </span>
    );
  }
  if (sentiment === 'bearish') {
    return (
      <span className="inline-flex items-center space-x-1 rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 font-mono text-[11px] font-bold text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/60 dark:text-rose-400">
        <TrendingDown className="h-3 w-3" />
        <span>BEARISH</span>
        <span className="opacity-80">-{Math.abs(score).toFixed(2)}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center space-x-1 rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
      <Minus className="h-3 w-3" />
      <span>NEUTRAL</span>
    </span>
  );
}

function timeAgo(dateString: string): string {
  try {
    const diff = (Date.now() - new Date(dateString).getTime()) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch {
    return 'Recent';
  }
}

export function NewsCard({
  article,
  isBookmarked,
  onToggleBookmark,
  onSelectTicker,
  onSelectCategory,
}: NewsCardProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: article.url,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(article.url);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-[#0d131f]/80 dark:hover:border-slate-700 dark:hover:bg-[#121929] dark:hover:shadow-emerald-500/5">
      {/* Optional Thumbnail Image */}
      {article.imageUrl && (
        <a 
          href={`/news/${article.id}`}
          className="relative block h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60"
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </a>
      )}

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Card Header: Source, Category & Sentiment */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-slate-200 dark:bg-slate-800/90 dark:text-emerald-400 dark:border-slate-700">
                {article.source}
              </span>
              <button
                onClick={() => onSelectCategory(article.category)}
                className="text-[11px] font-medium uppercase text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                • {article.category.replace('_', ' ')}
              </button>
            </div>

            <SentimentBadge sentiment={article.sentiment} score={article.sentimentScore} />
          </div>

          {/* Title */}
          <h3 className="text-base font-bold leading-snug text-slate-900 transition group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">
            <a
              href={`/news/${article.id}`}
              className="focus:outline-none"
            >
              {article.title}
            </a>
          </h3>

          {/* Summary */}
          <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
            {article.summary}
          </p>

          {/* Ticker Badges */}
          {article.tickers && article.tickers.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tickers.map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => onSelectTicker(ticker)}
                  className="inline-flex items-center rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/60"
                >
                  {ticker}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Metadata and Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{timeAgo(article.publishedAt)}</span>
            </span>
            <span>•</span>
            <span>{article.readTimeMinutes}m read</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleBookmark(article)}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
              className={`rounded-lg p-1.5 transition ${
                isBookmarked
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-emerald-600 dark:fill-emerald-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              title="Share Article"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Read full article on original publisher"
              className="flex items-center space-x-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-emerald-500"
            >
              <span>Read Article</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
