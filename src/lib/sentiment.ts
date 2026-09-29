import { SentimentType } from '@/types';

// Financial sentiment lexicon with weights
const BULLISH_TERMS: Record<string, number> = {
  surge: 1.0,
  surges: 1.0,
  surged: 1.0,
  soar: 1.0,
  soars: 1.0,
  soared: 1.0,
  rally: 0.9,
  rallies: 0.9,
  rallied: 0.9,
  beat: 0.8,
  beats: 0.8,
  breakout: 0.9,
  jump: 0.7,
  jumps: 0.7,
  jumped: 0.7,
  gain: 0.7,
  gains: 0.7,
  gained: 0.7,
  growth: 0.6,
  profit: 0.8,
  profitable: 0.8,
  dividend: 0.9,
  dividends: 0.9,
  turnover: 0.6,
  remittance: 0.7,
  export: 0.6,
  exports: 0.6,
  cash: 0.5,
  bonus: 0.7,
  expansion: 0.7,
  rebound: 0.8,
  upgrade: 0.8,
  bullish: 0.9,
  alltime: 0.9,
  recovery: 0.7,
  inflow: 0.8,
  inflows: 0.8,
  surplus: 0.8,
};

const BEARISH_TERMS: Record<string, number> = {
  plunge: -1.0,
  plunges: -1.0,
  plunged: -1.0,
  slump: -0.9,
  slumps: -0.9,
  slumped: -0.9,
  drop: -0.7,
  drops: -0.7,
  dropped: -0.7,
  fall: -0.7,
  falls: -0.7,
  fell: -0.7,
  slide: -0.8,
  slides: -0.8,
  slid: -0.8,
  loss: -0.8,
  losses: -0.8,
  selloff: -0.9,
  "sell-off": -0.9,
  bear: -0.8,
  bearish: -0.9,
  npl: -0.9,
  npls: -0.9,
  default: -0.9,
  defaulted: -0.9,
  inflation: -0.6,
  probe: -0.8,
  investigation: -0.8,
  fine: -0.7,
  fined: -0.7,
  penalty: -0.8,
  liquidity: -0.6,
  crunch: -0.8,
  deficit: -0.7,
  depreciation: -0.7,
  scam: -1.0,
  irregularity: -0.8,
  irregularities: -0.8,
};

// DSE Top Stocks & Tickers
const DSE_TICKERS = [
  'GP', 'SQURPHARMA', 'BATBC', 'BRACBANK', 'BEXIMCO', 'WALTONHIL', 
  'RENATA', 'LHBL', 'OLYMPIC', 'ISLAMIBANK', 'CITYBANK', 'UPGDCL', 
  'ROBI', 'PUBALIBANK', 'EBL', 'MARICO', 'BERGERPBL', 'SUMITPOWER', 
  'HEIDELBCEM', 'BXPHARMA', 'ACME', 'IFIC', 'LANKABAFIN', 'BEXGSUKUK',
  'DSEX', 'DS30', 'DSES'
];

const COMPANY_MAPPINGS: Record<string, string> = {
  grameenphone: 'GP',
  square: 'SQURPHARMA',
  pharma: 'SQURPHARMA',
  batbc: 'BATBC',
  tobacco: 'BATBC',
  brac: 'BRACBANK',
  beximco: 'BEXIMCO',
  walton: 'WALTONHIL',
  renata: 'RENATA',
  lafarge: 'LHBL',
  lafargeholcim: 'LHBL',
  olympic: 'OLYMPIC',
  islami: 'ISLAMIBANK',
  city: 'CITYBANK',
  united: 'UPGDCL',
  robi: 'ROBI',
  pubali: 'PUBALIBANK',
  eastern: 'EBL',
  marico: 'MARICO',
  berger: 'BERGERPBL',
  summit: 'SUMITPOWER',
  dse: 'DSEX',
  dsex: 'DSEX',
};

/**
 * Analyzes financial sentiment of title and text
 */
export function analyzeSentiment(text: string): { sentiment: SentimentType; score: number } {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
  const words = cleaned.split(/\s+/).filter(Boolean);

  let totalScore = 0;
  let matches = 0;

  for (const word of words) {
    if (BULLISH_TERMS[word]) {
      totalScore += BULLISH_TERMS[word];
      matches++;
    } else if (BEARISH_TERMS[word]) {
      totalScore += BEARISH_TERMS[word];
      matches++;
    }
  }

  // Common Bangladeshi market phrases
  const lowerText = text.toLowerCase();
  if (lowerText.includes('turnover crosses') || lowerText.includes('dsex rises') || lowerText.includes('cash dividend') || lowerText.includes('profit jumps')) {
    totalScore += 1.2;
    matches += 2;
  }
  if (lowerText.includes('dsex falls') || lowerText.includes('turnover drops') || lowerText.includes('default loan') || lowerText.includes('bsec probe')) {
    totalScore -= 1.2;
    matches += 2;
  }

  let normalizedScore = 0;
  if (matches > 0) {
    normalizedScore = Math.max(-1, Math.min(1, totalScore / Math.sqrt(matches)));
  }

  const score = Math.round(normalizedScore * 100) / 100;

  let sentiment: SentimentType = 'neutral';
  if (score >= 0.15) {
    sentiment = 'bullish';
  } else if (score <= -0.15) {
    sentiment = 'bearish';
  }

  return { sentiment, score };
}

/**
 * Extracts recognized DSE stock tickers from text
 */
export function extractTickers(text: string): string[] {
  const found = new Set<string>();

  // Standalone uppercase words
  const words = text.split(/[\s,.;:()"'/]+/);
  for (const word of words) {
    if (DSE_TICKERS.includes(word.toUpperCase())) {
      found.add(word.toUpperCase());
    }
  }

  // Company names in text
  const lowerText = text.toLowerCase();
  for (const [name, ticker] of Object.entries(COMPANY_MAPPINGS)) {
    const regex = new RegExp(`\\b${name}\\b`, 'i');
    if (regex.test(lowerText)) {
      found.add(ticker);
    }
  }

  return Array.from(found).slice(0, 4);
}
