'use client';

import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#060a12] dark:text-slate-400">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand info */}
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
          <span className="font-mono font-bold text-slate-900 dark:text-slate-200">DSE PULSE TERMINAL</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="text-slate-600 dark:text-slate-400">Dhaka Stock Exchange & National Financial Intelligence</span>
        </div>

        {/* Center: Copyright to Md. Hasibul Alam */}
        <div className="flex items-center space-x-1.5 font-medium text-slate-700 dark:text-slate-300">
          <span>© {currentYear}</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Md. Hasibul Alam</span>
          <span className="text-slate-400">•</span>
          <span>All rights reserved.</span>
        </div>

        {/* Right: Exchange Timings & Regulations */}
        <div className="flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-500">
          <span>DSE / CSE delayed 15m</span>
          <span>|</span>
          <span>BST (GMT+6) Trading Zone</span>
        </div>
      </div>
    </footer>
  );
}
