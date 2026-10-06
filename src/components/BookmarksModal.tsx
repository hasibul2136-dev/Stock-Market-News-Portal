'use client';

import React from 'react';
import { NewsArticle } from '@/types';
import { X, Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateHeadline } from '@/lib/translator';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: NewsArticle[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectTicker: (ticker: string) => void;
}

export function BookmarksModal({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onClearAll,
  onSelectTicker,
}: BookmarksModalProps) {
  const { t, toBnNum, isBangla } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-colors duration-200 dark:border-slate-700 dark:bg-[#0b101b]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {isBangla ? 'সংরক্ষিত সংবাদ তালিকা' : 'Saved Intelligence & Watchlist Articles'} ({toBnNum(bookmarks.length)})
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {bookmarks.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center space-x-1 rounded-lg border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900"
              >
                <Trash2 className="h-3 w-3" />
                <span>{isBangla ? 'সব মুছুন' : 'Clear All'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-600 mb-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {isBangla ? 'এখনও কোনো সংবাদ সংরক্ষণ করা হয়নি' : 'No saved articles yet'}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {isBangla ? 'যেকোনো সংবাদের বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।' : 'Click the bookmark icon on any news card to save it for offline review.'}
              </p>
            </div>
          ) : (
            bookmarks.map((art) => (
              <div
                key={art.id}
                className="group relative rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-[#0f172a]/70 dark:hover:border-slate-700 dark:hover:bg-[#131d33]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-slate-800 dark:text-emerald-400">
                        {art.source}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {new Date(art.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 dark:text-slate-100 dark:hover:text-emerald-400 transition"
                    >
                      {isBangla ? translateHeadline(art.title) : art.title}
                    </a>

                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {art.summary}
                    </p>

                    {art.tickers.length > 0 && (
                      <div className="mt-2 flex space-x-1.5">
                        {art.tickers.map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              onSelectTicker(t);
                              onClose();
                            }}
                            className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      title="Remove"
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-rose-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-800 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
