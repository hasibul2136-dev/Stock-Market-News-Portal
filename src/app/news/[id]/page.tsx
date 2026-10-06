'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NewsArticle } from '@/types';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Check,
  Building2
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { translateHeadline, CATEGORY_BN } from '@/lib/translator';

export default function NewsArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { isBangla, toBnNum } = useLanguage();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const found = data.data.find((a: NewsArticle) => a.id === id);
          if (found) {
            setArticle(found);
            setRelatedArticles(data.data.filter((a: NewsArticle) => a.id !== id).slice(0, 4));
          } else {
            // Default to first article if id not exact
            setArticle(data.data[0]);
            setRelatedArticles(data.data.slice(1, 5));
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center dark:bg-[#090d16]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-100 p-8 text-center dark:bg-[#090d16]">
        <h2 className="text-xl font-bold">Article Not Found</h2>
        <Link href="/" className="mt-4 inline-block text-emerald-600 underline">Return to Portal</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-[#090d16] dark:text-slate-100">
      {/* Top Navbar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#0d131f]/90 sticky top-0 z-30">
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8 xl:px-12">
          <Link
            href="/"
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isBangla ? 'পোর্টাল-এ ফিরুন' : 'Back to Portal'}</span>
          </Link>

          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? (isBangla ? 'কপি হয়েছে' : 'Copied') : (isBangla ? 'শেয়ার' : 'Share')}</span>
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
            >
              <span>{isBangla ? 'মূল উৎস' : 'Original Source'}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <article className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Source & Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded bg-emerald-100 px-2.5 py-0.5 font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60">
            {article.source}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-500 uppercase">
            {isBangla ? (CATEGORY_BN[article.category] || article.category) : article.category.replace('_', ' ')}
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center space-x-1 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-500">{toBnNum(article.readTimeMinutes)} {isBangla ? 'মিনিট পাঠ' : 'min read'}</span>
        </div>

        {/* Headline */}
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 dark:text-white">
          {isBangla ? translateHeadline(article.title) : article.title}
        </h1>

        {/* Sentiment Analysis Pill */}
        <div className="mt-3 flex items-center space-x-3">
          <div className={`inline-flex items-center space-x-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold border ${
            article.sentiment === 'bullish'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
              : article.sentiment === 'bearish'
              ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400'
              : 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            {article.sentiment === 'bullish' ? <TrendingUp className="h-3.5 w-3.5" /> : article.sentiment === 'bearish' ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
            <span className="uppercase">{article.sentiment}</span>
            <span>({article.sentimentScore > 0 ? '+' : ''}{article.sentimentScore.toFixed(2)})</span>
          </div>

          {article.tickers.length > 0 && (
            <div className="flex items-center space-x-1.5">
              <span className="text-xs text-slate-500 font-mono">Tagged:</span>
              {article.tickers.map(t => (
                <Link
                  key={t}
                  href={`/stocks/${t}`}
                  className="rounded bg-slate-200 px-2 py-0.5 font-mono text-xs font-bold text-slate-800 hover:bg-emerald-100 hover:text-emerald-700 transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[460px] object-cover"
            />
          </div>
        )}

        {/* Article Summary & Body */}
        <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="text-lg font-medium leading-relaxed text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-4 py-1 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r">
            {article.summary}
          </p>

          <p>
            The Dhaka Stock Exchange (DSE) and market participants closely monitor corporate developments, regulatory governance directives from the Bangladesh Securities and Exchange Commission (BSEC), and institutional capital deployment.
          </p>

          <p>
            Industry analysts emphasize that audited financial balance sheet transparency, reliable dividend distribution yield records, and macro liquidity indicators remain the primary drivers for foreign portfolio investors and domestic mutual funds.
          </p>
        </div>

        {/* Action Callout */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0d131f]/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Read Original Article on {article.source}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified source published directly on {article.source} official portal.
            </p>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow"
          >
            <span>Open {article.source}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Related DSE Stories */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
            <h3 className="font-mono text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              More Bangladeshi Market Intelligence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map(rel => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.id}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-300 transition dark:border-slate-800 dark:bg-[#0d131f]/90 dark:hover:border-slate-700"
                >
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    {rel.source}
                  </span>
                  <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
