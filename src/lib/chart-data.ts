import { INITIAL_STOCKS, INITIAL_INDICES } from './market-data';

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Generate realistic technical chart data perfectly anchored to official DSE closing prices
export function getChartData(symbol: string, timeframe: '1D' | '1W' | '1M' | '1Y' = '1M'): {
  candles: CandlePoint[];
  basePrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  unit: string;
} {
  const cleanSymbol = (symbol || 'GP').replace('$', '').toUpperCase();

  // Find exact quote from official DSE data
  const matchedStock = INITIAL_STOCKS.find(s => s.symbol === cleanSymbol);
  const matchedIndex = INITIAL_INDICES.find(i => 
    i.symbol === cleanSymbol || 
    (cleanSymbol === 'USDBDT' && i.symbol === 'USD / BDT') ||
    (cleanSymbol.includes('CALL') && i.symbol === 'CALL MONEY')
  );

  let basePrice = 242.40;
  let change = -1.10;
  let changePercent = -0.45;
  let unit = '৳';

  if (matchedStock) {
    basePrice = matchedStock.price;
    change = matchedStock.change;
    changePercent = matchedStock.changePercent;
    unit = '৳';
  } else if (matchedIndex) {
    basePrice = matchedIndex.price;
    change = matchedIndex.change;
    changePercent = matchedIndex.changePercent;
    unit = matchedIndex.symbol.includes('CALL') ? '%' : matchedIndex.symbol.includes('BDT') ? '৳' : 'pts';
  }

  const pointCount = timeframe === '1D' ? 24 : timeframe === '1W' ? 30 : timeframe === '1M' ? 35 : 45;
  const volatility = 0.008;

  // Seeded deterministic walk using symbol hash so chart is consistent
  let seed = 0;
  for (let i = 0; i < cleanSymbol.length; i++) {
    seed = (seed << 5) - seed + cleanSymbol.charCodeAt(i);
  }
  const pseudoRand = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  const now = Date.now();
  const timeStepMs = timeframe === '1D' ? 3600 * 1000 : timeframe === '1W' ? 86400 * 1000 * 0.5 : timeframe === '1M' ? 86400 * 1000 : 86400 * 1000 * 7;

  // Generate historical points working backwards from the exact official closing basePrice
  const rawCloses: number[] = new Array(pointCount);
  rawCloses[pointCount - 1] = basePrice;

  let currentBack = basePrice;
  for (let i = pointCount - 2; i >= 0; i--) {
    const r1 = pseudoRand(i * 3 + 1);
    const delta = (r1 - 0.49) * volatility * currentBack;
    currentBack = +(currentBack - delta).toFixed(2);
    rawCloses[i] = currentBack;
  }

  const candles: CandlePoint[] = [];
  for (let i = 0; i < pointCount; i++) {
    const close = rawCloses[i];
    const open = i === 0 ? +(close * 0.998).toFixed(2) : rawCloses[i - 1];
    const r2 = pseudoRand(i * 3 + 2);
    const r3 = pseudoRand(i * 3 + 3);

    const high = +(Math.max(open, close) + r2 * volatility * close * 0.5).toFixed(2);
    const low = +(Math.min(open, close) - r3 * volatility * close * 0.5).toFixed(2);
    const volume = Math.floor((cleanSymbol.includes('DSE') ? 50000000 : 150000) * (0.6 + r2 * 0.8));

    const pointTime = new Date(now - (pointCount - 1 - i) * timeStepMs);
    const timeLabel = timeframe === '1D' 
      ? pointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : pointTime.toLocaleDateString([], { month: 'short', day: 'numeric' });

    candles.push({
      time: timeLabel,
      open,
      high,
      low,
      close,
      volume,
    });
  }

  // Ensure final candle close is EXACTLY the official closing basePrice
  candles[candles.length - 1].close = basePrice;

  // Calculate actual period change
  const periodOpen = candles[0].open;
  const periodChange = +(basePrice - periodOpen).toFixed(2);
  const periodChangePercent = +((periodChange / periodOpen) * 100).toFixed(2);

  return {
    candles,
    basePrice,
    currentPrice: basePrice,
    change: timeframe === '1D' ? change : periodChange,
    changePercent: timeframe === '1D' ? changePercent : periodChangePercent,
    unit,
  };
}
