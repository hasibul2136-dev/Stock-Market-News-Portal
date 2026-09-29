'use client';

import React, { useState, useMemo } from 'react';
import { getChartData, CandlePoint } from '@/lib/chart-data';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  LineChart as LineChartIcon,
  Maximize2,
  Activity
} from 'lucide-react';

interface DSETechnicalChartProps {
  symbol?: string;
  height?: number;
}

export function TradingViewWidget({ symbol = 'GP', height = 360 }: DSETechnicalChartProps) {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [hoveredPoint, setHoveredPoint] = useState<CandlePoint | null>(null);

  const cleanSymbol = (symbol || 'GP').replace('$', '').toUpperCase();

  const data = useMemo(() => {
    return getChartData(cleanSymbol, timeframe);
  }, [cleanSymbol, timeframe]);

  const activePoint = hoveredPoint || data.candles[data.candles.length - 1];
  const isPositive = data.change >= 0;

  // Chart dimensions & scaling
  const chartHeight = Math.max(160, height - 120);
  const chartWidth = 500;
  const paddingX = 15;
  const paddingY = 20;

  const minPrice = Math.min(...data.candles.map(c => c.low));
  const maxPrice = Math.max(...data.candles.map(c => c.high));
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...data.candles.map(c => c.volume));

  // Compute SVG Points for Area/Line
  const points = useMemo(() => {
    return data.candles.map((c, i) => {
      const x = paddingX + (i / (data.candles.length - 1)) * (chartWidth - 2 * paddingX);
      const y = paddingY + (1 - (c.close - minPrice) / priceRange) * (chartHeight - 2 * paddingY);
      return { x, y, candle: c };
    });
  }, [data.candles, minPrice, priceRange, chartHeight, chartWidth]);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${(chartWidth - paddingX).toFixed(1)} ${chartHeight} L ${paddingX} ${chartHeight} Z`;

  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  const fillColor = isPositive ? 'url(#greenGradient)' : 'url(#redGradient)';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-[#0d131f]/90">
      {/* Chart Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {cleanSymbol}
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
                {cleanSymbol.includes('CALL') ? 'INTERBANK' : cleanSymbol.includes('DSE') ? 'INDEX' : 'DSE'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {cleanSymbol.includes('CALL') ? 'Bangladesh Bank Call Rate' : 'Dhaka Stock Exchange'}
            </span>
          </div>
        </div>

        {/* Chart Type & Timeframe Buttons */}
        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setChartType('area')}
              title="Area Chart"
              className={`rounded p-1 text-xs transition ${
                chartType === 'area'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LineChartIcon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setChartType('candles')}
              title="Candlestick Chart"
              className={`rounded p-1 text-xs transition ${
                chartType === 'candles'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Timeframe Tabs */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 font-mono text-[10px] font-semibold dark:border-slate-800 dark:bg-slate-900">
            {(['1D', '1W', '1M', '1Y'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`rounded px-1.5 py-0.5 transition ${
                  timeframe === tf
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price & Change Banner */}
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <div className="font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {data.unit === '৳' ? '৳' : ''}
            {activePoint.close.toFixed(2)}
            {data.unit === '%' ? '%' : data.unit === 'pts' ? ' pts' : ''}
          </div>
          <div
            className={`flex items-center font-mono text-xs font-semibold ${
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="mr-1 h-3.5 w-3.5" />
            )}
            {isPositive ? '+' : ''}
            {data.change.toFixed(2)} ({isPositive ? '+' : ''}
            {data.changePercent.toFixed(2)}%) • {timeframe}
          </div>
        </div>

        {/* Hover Readout */}
        <div className="text-right text-[11px] font-mono text-slate-500">
          <div>O: <span className="text-slate-700 dark:text-slate-300">{activePoint.open.toFixed(2)}</span> H: <span className="text-slate-700 dark:text-slate-300">{activePoint.high.toFixed(2)}</span></div>
          <div>L: <span className="text-slate-700 dark:text-slate-300">{activePoint.low.toFixed(2)}</span> C: <span className="text-slate-700 dark:text-slate-300">{activePoint.close.toFixed(2)}</span></div>
          <div className="text-[10px] text-slate-400">{activePoint.time}</div>
        </div>
      </div>

      {/* SVG Chart Visualizer */}
      <div className="relative mt-2 w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={chartWidth - paddingX}
            y2={paddingY}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800/70"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={chartHeight / 2}
            x2={chartWidth - paddingX}
            y2={chartHeight / 2}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800/70"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800/70"
            strokeDasharray="3 3"
          />

          {/* Volume Bars at Bottom */}
          {data.candles.map((c, i) => {
            const x = paddingX + (i / (data.candles.length - 1)) * (chartWidth - 2 * paddingX);
            const barHeight = (c.volume / maxVolume) * 28;
            const y = chartHeight - barHeight;
            const barPositive = c.close >= c.open;
            return (
              <rect
                key={`vol-${i}`}
                x={x - 2}
                y={y}
                width={3.5}
                height={barHeight}
                fill={barPositive ? '#10b981' : '#f43f5e'}
                opacity={0.25}
              />
            );
          })}

          {chartType === 'area' ? (
            <>
              {/* Area fill */}
              <path d={areaPath} fill={fillColor} />
              {/* Stroke line */}
              <path
                d={linePath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            /* Candlestick Rendering */
            data.candles.map((c, i) => {
              const x = paddingX + (i / (data.candles.length - 1)) * (chartWidth - 2 * paddingX);
              const openY = paddingY + (1 - (c.open - minPrice) / priceRange) * (chartHeight - 2 * paddingY);
              const closeY = paddingY + (1 - (c.close - minPrice) / priceRange) * (chartHeight - 2 * paddingY);
              const highY = paddingY + (1 - (c.high - minPrice) / priceRange) * (chartHeight - 2 * paddingY);
              const lowY = paddingY + (1 - (c.low - minPrice) / priceRange) * (chartHeight - 2 * paddingY);

              const isCandleGreen = c.close >= c.open;
              const candleColor = isCandleGreen ? '#10b981' : '#f43f5e';
              const topY = Math.min(openY, closeY);
              const candleBodyHeight = Math.max(2, Math.abs(closeY - openY));

              return (
                <g key={`candle-${i}`}>
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={candleColor}
                    strokeWidth="1.2"
                  />
                  {/* Body */}
                  <rect
                    x={x - 3}
                    y={topY}
                    width={6}
                    height={candleBodyHeight}
                    fill={candleColor}
                    rx={1}
                  />
                </g>
              );
            })
          )}

          {/* Interactive Hover Hitboxes */}
          {points.map((p, i) => (
            <rect
              key={`hit-${i}`}
              x={p.x - 6}
              y={0}
              width={12}
              height={chartHeight}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoveredPoint(p.candle)}
            />
          ))}

          {/* Crosshair indicator when hovered */}
          {hoveredPoint && (
            (() => {
              const activeIdx = data.candles.findIndex(c => c === hoveredPoint);
              if (activeIdx === -1) return null;
              const p = points[activeIdx];
              return (
                <g pointerEvents="none">
                  {/* Vertical Crosshair Line */}
                  <line
                    x1={p.x}
                    y1={0}
                    x2={p.x}
                    y2={chartHeight}
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  {/* Active Point Circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={4.5}
                    fill="#06b6d4"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              );
            })()
          )}
        </svg>
      </div>

      {/* Footer Details */}
      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">
        <span>Min: {minPrice.toFixed(2)}</span>
        <span>Avg: {((minPrice + maxPrice) / 2).toFixed(2)}</span>
        <span>Max: {maxPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
