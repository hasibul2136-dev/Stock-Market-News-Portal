import { MarketIndex, StockQuote } from '@/types';

export const INITIAL_INDICES: MarketIndex[] = [
  {
    symbol: 'DSEX',
    name: 'DSE Broad Index',
    price: 5552.40,
    change: -18.60,
    changePercent: -0.33,
    sparkline: [5580, 5575, 5568, 5560, 5558, 5554, 5552.40],
  },
  {
    symbol: 'DS30',
    name: 'DSE 30 Blue Chip',
    price: 1985.20,
    change: -7.40,
    changePercent: -0.37,
    sparkline: [1995, 1992, 1990, 1988, 1987, 1986, 1985.20],
  },
  {
    symbol: 'DSES',
    name: 'DSE Shariah Index',
    price: 1221.80,
    change: -4.10,
    changePercent: -0.33,
    sparkline: [1228, 1226, 1225, 1224, 1223, 1222, 1221.80],
  },
  {
    symbol: 'CASPI',
    name: 'CSE All Share Price',
    price: 15580.40,
    change: -52.10,
    changePercent: -0.33,
    sparkline: [15650, 15630, 15610, 15600, 15590, 15585, 15580.40],
  },
  {
    symbol: 'USD / BDT',
    name: 'Interbank Forex',
    price: 121.75,
    change: 0.15,
    changePercent: 0.12,
    sparkline: [121.4, 121.5, 121.55, 121.6, 121.7, 121.75],
  },
  {
    symbol: 'CALL MONEY',
    name: 'Interbank Call Rate',
    price: 9.85,
    change: 0.00,
    changePercent: 0.00,
    sparkline: [9.85, 9.85, 9.85, 9.85, 9.85, 9.85],
  }
];

export const INITIAL_STOCKS: StockQuote[] = [
  {
    symbol: 'GP',
    name: 'Grameenphone Ltd.',
    category: 'Telecom',
    price: 242.40,
    change: -1.10,
    changePercent: -0.45,
    high: 244.00,
    low: 242.00,
    volume: '892K',
    marketCap: '৳32,730 Cr',
    sparkline: [243.5, 243.8, 244.0, 243.2, 242.6, 242.40],
  },
  {
    symbol: 'SQURPHARMA',
    name: 'Square Pharmaceuticals PLC',
    category: 'Pharmaceuticals',
    price: 217.60,
    change: 0.50,
    changePercent: 0.23,
    high: 218.00,
    low: 217.10,
    volume: '1.25M',
    marketCap: '৳19,289 Cr',
    sparkline: [217.1, 217.2, 217.5, 217.8, 217.9, 217.60],
  },
  {
    symbol: 'BATBC',
    name: 'British American Tobacco BD',
    category: 'Food & Allied',
    price: 225.30,
    change: -0.70,
    changePercent: -0.31,
    high: 226.50,
    low: 224.80,
    volume: '418K',
    marketCap: '৳12,166 Cr',
    sparkline: [226.0, 226.2, 226.5, 225.8, 225.5, 225.30],
  },
  {
    symbol: 'BRACBANK',
    name: 'BRAC Bank PLC',
    category: 'Banking',
    price: 64.40,
    change: 0.40,
    changePercent: 0.63,
    high: 65.00,
    low: 63.80,
    volume: '4.82M',
    marketCap: '৳10,380 Cr',
    sparkline: [64.0, 64.2, 64.6, 64.8, 64.5, 64.40],
  },
  {
    symbol: 'WALTONHIL',
    name: 'Walton Hi-Tech Industries PLC',
    category: 'Engineering',
    price: 343.50,
    change: -1.50,
    changePercent: -0.43,
    high: 346.00,
    low: 341.20,
    volume: '185K',
    marketCap: '৳10,405 Cr',
    sparkline: [345.0, 345.5, 346.0, 344.5, 344.0, 343.50],
  },
  {
    symbol: 'RENATA',
    name: 'Renata PLC',
    category: 'Pharmaceuticals',
    price: 452.60,
    change: 1.60,
    changePercent: 0.35,
    high: 456.00,
    low: 450.00,
    volume: '142K',
    marketCap: '৳5,190 Cr',
    sparkline: [451.0, 452.0, 454.0, 455.0, 453.5, 452.60],
  },
  {
    symbol: 'LHBL',
    name: 'LafargeHolcim Bangladesh PLC',
    category: 'Cement',
    price: 61.80,
    change: 0.30,
    changePercent: 0.49,
    high: 62.40,
    low: 61.20,
    volume: '2.38M',
    marketCap: '৳7,177 Cr',
    sparkline: [61.5, 61.6, 62.0, 62.2, 61.9, 61.80],
  },
  {
    symbol: 'BEXIMCO',
    name: 'Beximco Limited',
    category: 'Diversified',
    price: 22.10,
    change: 0.10,
    changePercent: 0.45,
    high: 22.30,
    low: 21.90,
    volume: '3.62M',
    marketCap: '৳1,935 Cr',
    sparkline: [22.0, 22.0, 22.2, 22.2, 22.1, 22.10],
  },
  {
    symbol: 'ROBI',
    name: 'Robi Axiata PLC',
    category: 'Telecom',
    price: 30.00,
    change: 0.20,
    changePercent: 0.67,
    high: 30.30,
    low: 29.70,
    volume: '5.12M',
    marketCap: '৳15,713 Cr',
    sparkline: [29.8, 29.9, 30.2, 30.1, 30.0, 30.00],
  },
  {
    symbol: 'CITYBANK',
    name: 'City Bank PLC',
    category: 'Banking',
    price: 24.80,
    change: 0.20,
    changePercent: 0.81,
    high: 25.00,
    low: 24.40,
    volume: '2.84M',
    marketCap: '৳3,235 Cr',
    sparkline: [24.6, 24.7, 24.9, 24.9, 24.8, 24.80],
  }
];

export function getMarketStatus(): { isOpen: boolean; statusText: string; nextEvent: string } {
  const now = new Date();
  const bstTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  const bstDate = new Date(bstTimeStr);
  const day = bstDate.getDay();
  const hours = bstDate.getHours();
  const minutes = bstDate.getMinutes();
  const currentMinuteOfDay = hours * 60 + minutes;

  const isTradingDay = day >= 0 && day <= 4;
  const isDuringHours = currentMinuteOfDay >= 600 && currentMinuteOfDay < 870;

  if (isTradingDay && isDuringHours) {
    return {
      isOpen: true,
      statusText: 'DSE TRADING OPEN',
      nextEvent: 'Closes at 2:30 PM BST',
    };
  }

  if (isTradingDay && currentMinuteOfDay < 600) {
    return {
      isOpen: false,
      statusText: 'PRE-OPENING (DSE)',
      nextEvent: 'Opens today at 10:00 AM BST',
    };
  }

  if (day === 4 && currentMinuteOfDay >= 870) {
    return {
      isOpen: false,
      statusText: 'MARKET CLOSED (WEEKEND)',
      nextEvent: 'Opens Sunday 10:00 AM BST',
    };
  }

  if (day === 5 || day === 6) {
    return {
      isOpen: false,
      statusText: 'MARKET CLOSED (WEEKEND)',
      nextEvent: 'Opens Sunday 10:00 AM BST',
    };
  }

  return {
    isOpen: false,
    statusText: 'DSE CLOSED',
    nextEvent: 'Opens next trading day 10:00 AM BST',
  };
}
