'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages, Globe } from 'lucide-react';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 ${className}`}>
        <Languages className="mr-1.5 h-3.5 w-3.5" />
        <span>বাং / EN</span>
      </div>
    );
  }

  const isBangla = language === 'bn';

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language between English and Bangla"
      title={isBangla ? 'Switch to English (ইংরেজি)' : 'Switch to বাংলা (Bangla)'}
      className={`group relative flex h-9 items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-slate-50 hover:text-emerald-700 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-slate-800/80 dark:hover:text-emerald-400 ${className}`}
    >
      <Languages className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
      
      {/* Pill badge showing the current / next language */}
      <span className="font-mono text-[11px] font-bold tracking-wide">
        {isBangla ? (
          <span className="flex items-center space-x-1">
            <span className="text-emerald-700 dark:text-emerald-400">বাংলা</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-400 hover:text-slate-900 dark:hover:text-white">EN</span>
          </span>
        ) : (
          <span className="flex items-center space-x-1">
            <span className="text-slate-900 dark:text-white">EN</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-emerald-700 dark:text-emerald-400">বাং</span>
          </span>
        )}
      </span>
    </button>
  );
}
