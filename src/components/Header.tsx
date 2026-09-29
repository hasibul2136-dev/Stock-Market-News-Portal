'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Search, 
  Bookmark, 
  RefreshCw, 
  Clock, 
  Sun, 
  Moon, 
  Zap,
  Globe
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  onSearch: (query: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
  marketStatus: {
    isOpen: boolean;
    statusText: string;
    nextEvent: string;
  };
}

export function Header({
  onSearch,
  onRefresh,
  isRefreshing,
  bookmarkedCount,
  onOpenBookmarks,
  marketStatus
}: HeaderProps) {
  const [searchInput, setSearchInput] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('dsepulse_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark !== false;

      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    try {
      localStorage.setItem('dsepulse_theme', nextDark ? 'dark' : 'light');
    } catch {
      // Ignore
    }
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' BST'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#090d16]/95 dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8 xl:px-12">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 shadow-lg shadow-emerald-500/20">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                DSE<span className="text-emerald-600 dark:text-emerald-400">PULSE</span>
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800/50">
                BANGLADESH
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Dhaka Stock Exchange & National Economy Intelligence
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="relative mx-4 hidden max-w-md flex-1 md:block"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search DSE news, companies (GP, SQURPHARMA, BRACBANK)..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-10 text-xs text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-200 dark:placeholder-slate-500"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  onSearch('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Right Action & Status Controls */}
        <div className="flex items-center space-x-3">
          {/* Live Market Hours Indicator */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 rounded-lg border border-slate-200 bg-slate-100/80 px-2 sm:px-3 py-1 sm:py-1.5 dark:border-slate-800 dark:bg-[#0f172a]/70">
            <span className="relative flex h-2 w-2">
              {marketStatus.isOpen ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              )}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              {marketStatus.statusText}
            </span>
            <span className="hidden sm:inline text-[10px] text-slate-500">
              • {currentTime || 'BST'}
            </span>
          </div>

          {/* Refresh Feed */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh News Feed"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:opacity-50 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarks}
            title="Saved Articles"
            className="relative flex h-9 items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
          >
            <Bookmark className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <span className="font-mono text-xs font-semibold">{bookmarkedCount}</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Search input */}
      <div className="px-4 pb-2 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search DSE companies, banking, pharma..."
            className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-200 dark:placeholder-slate-500"
          />
        </form>
      </div>
    </header>
  );
}
