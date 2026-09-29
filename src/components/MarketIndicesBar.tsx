'use client';

import React from 'react';
import { MarketIndex } from '@/types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketIndicesBarProps {
  indices: MarketIndex[];
  onSelectIndex?: (symbol: string) => void;
}

function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 80;
  const height = 28;
  const padding = 2;

  const points = data
    .map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - min) / range) * (height - 2 * padding);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';

  const firstX = padding;
  const lastX = width - padding;
  const areaPath = `M ${firstX},${height} L ${points} L ${lastX},${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={areaPath} fill={fillColor} />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function MarketIndicesBar({ indices, onSelectIndex }: MarketIndicesBarProps) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {indices.map((idx) => {
          const isPositive = idx.change >= 0;
          return (
            <div
              key={idx.symbol}
              onClick={() => onSelectIndex && onSelectIndex(idx.symbol)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:border-emerald-400 hover:bg-slate-50 cursor-pointer dark:border-slate-800/80 dark:bg-[#0d131f]/90 dark:hover:border-slate-700 dark:hover:bg-[#121a2b] dark:hover:shadow-emerald-500/5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-700 group-hover:text-emerald-600 dark:text-slate-300 dark:group-hover:text-emerald-400">
                  {idx.symbol}
                </span>
                <span
                  className={`flex items-center font-mono text-[11px] font-semibold ${
                    isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
                  )}
                  {isPositive ? '+' : ''}
                  {idx.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <div className="font-mono text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {idx.symbol.includes('CALL') 
                      ? `${idx.price.toFixed(2)}%` 
                      : idx.symbol.includes('BDT')
                      ? `৳${idx.price.toFixed(2)}`
                      : idx.price > 1000
                      ? idx.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : idx.price.toFixed(2)}
                  </div>
                  <div
                    className={`font-mono text-[10px] ${
                      isPositive ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {idx.change.toFixed(2)} pts
                  </div>
                </div>

                <div className="pl-1">
                  <Sparkline data={idx.sparkline} isPositive={isPositive} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
