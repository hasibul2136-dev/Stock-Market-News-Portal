'use client';

import React from 'react';
import { StockQuote } from '@/types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerMarqueeProps {
  stocks: StockQuote[];
  onSelectTicker: (symbol: string) => void;
}

import { useLanguage } from '@/context/LanguageContext';

export function TickerMarquee({ stocks, onSelectTicker }: TickerMarqueeProps) {
  const { toBnNum } = useLanguage();
  const displayStocks = [...stocks, ...stocks];

  return (
    <div className="w-full overflow-hidden border-b border-slate-200 bg-slate-100 py-1.5 shadow-inner transition-colors duration-200 dark:border-slate-800 dark:bg-[#060a12]">
      <div className="animate-marquee-smooth flex items-center space-x-6">
        {displayStocks.map((stock, idx) => {
          const isPositive = stock.change >= 0;
          return (
            <button
              key={`${stock.symbol}-${idx}`}
              onClick={() => onSelectTicker(stock.symbol)}
              className="group flex items-center space-x-2 rounded px-2 py-0.5 font-mono text-xs transition hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
            >
              <span className="font-bold text-slate-800 group-hover:text-emerald-600 dark:text-slate-200 dark:group-hover:text-emerald-400">
                {stock.symbol}
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                ৳{toBnNum(stock.price.toFixed(2))}
              </span>
              <span
                className={`flex items-center font-semibold ${
                  isPositive 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3 stroke-[2.5]" />
                )}
                {isPositive ? '+' : '-'}
                {toBnNum(Math.abs(stock.changePercent).toFixed(2))}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
