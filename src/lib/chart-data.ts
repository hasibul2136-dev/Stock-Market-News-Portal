export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Generate realistic technical chart data for DSE symbols
export function getChartData(symbol: string, timeframe: '1D' | '1W' | '1M' | '1Y' = '1M'): {
  candles: CandlePoint[];
  basePrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  unit: string;
} {
  const cleanSymbol = symbol.replace('$', '').toUpperCase();

  let basePrice = 250;
  let volatility = 0.015;
  let unit = '৳';

  if (cleanSymbol === 'DSEX') {
    basePrice = 5552.40;
    volatility = 0.008;
    unit = 'pts';
  } else if (cleanSymbol === 'DS30') {
    basePrice = 1985.20;
    volatility = 0.007;
    unit = 'pts';
  } else if (cleanSymbol === 'DSES') {
    basePrice = 1221.80;
    volatility = 0.006;
    unit = 'pts';
  } else if (cleanSymbol === 'CASPI') {
    basePrice = 15580.40;
    volatility = 0.007;
    unit = 'pts';
  } else if (cleanSymbol.includes('CALL')) {
    basePrice = 9.85;
    volatility = 0.004;
    unit = '%';
  } else if (cleanSymbol.includes('BDT') || cleanSymbol.includes('USD')) {
    basePrice = 121.75;
    volatility = 0.002;
    unit = '৳';
  } else if (cleanSymbol === 'GP') {
    basePrice = 242.40;
    volatility = 0.012;
  } else if (cleanSymbol === 'SQURPHARMA') {
    basePrice = 217.60;
    volatility = 0.010;
  } else if (cleanSymbol === 'BATBC') {
    basePrice = 225.30;
    volatility = 0.014;
  } else if (cleanSymbol === 'BRACBANK') {
    basePrice = 64.40;
    volatility = 0.018;
  } else if (cleanSymbol === 'WALTONHIL') {
    basePrice = 343.50;
    volatility = 0.015;
  } else if (cleanSymbol === 'RENATA') {
    basePrice = 452.60;
    volatility = 0.013;
  } else if (cleanSymbol === 'LHBL') {
    basePrice = 61.80;
    volatility = 0.016;
  } else if (cleanSymbol === 'BEXIMCO') {
    basePrice = 22.10;
    volatility = 0.008;
  } else if (cleanSymbol === 'ROBI') {
    basePrice = 30.00;
    volatility = 0.015;
  } else if (cleanSymbol === 'CITYBANK') {
    basePrice = 24.80;
    volatility = 0.015;
  }

  const pointCount = timeframe === '1D' ? 24 : timeframe === '1W' ? 30 : timeframe === '1M' ? 35 : 45;
  const candles: CandlePoint[] = [];

  let current = basePrice * (1 - volatility * (pointCount / 3));

  // Seeded deterministic walk using symbol hash so chart doesn't wildly flash on every re-render
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

  for (let i = 0; i < pointCount; i++) {
    const r1 = pseudoRand(i * 3 + 1);
    const r2 = pseudoRand(i * 3 + 2);
    const r3 = pseudoRand(i * 3 + 3);

    const delta = (r1 - 0.47) * volatility * current;
    const open = current;
    const close = +(open + delta).toFixed(2);
    const high = +(Math.max(open, close) + r2 * volatility * current * 0.7).toFixed(2);
    const low = +(Math.min(open, close) - r3 * volatility * current * 0.7).toFixed(2);
    const volume = Math.floor((cleanSymbol.includes('DSE') ? 50000000 : 150000) * (0.6 + r1 * 0.8));

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

    current = close;
  }

  const firstClose = candles[0].open;
  const lastClose = candles[candles.length - 1].close;
  const change = +(lastClose - firstClose).toFixed(2);
  const changePercent = +((change / firstClose) * 100).toFixed(2);

  return {
    candles,
    basePrice,
    currentPrice: lastClose,
    change,
    changePercent,
    unit,
  };
}
