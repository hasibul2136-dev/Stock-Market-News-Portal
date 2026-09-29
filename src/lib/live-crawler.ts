import { INITIAL_INDICES, INITIAL_STOCKS } from './market-data';
import { MarketIndex, StockQuote } from '@/types';

interface CachedData {
  indices: MarketIndex[];
  stocks: StockQuote[];
  lastUpdated: number;
}

let cache: CachedData | null = null;
const CACHE_TTL_MS = 25000; // 25 seconds live cache

export async function getLiveMarketData(): Promise<{ indices: MarketIndex[]; stocks: StockQuote[]; isLive: boolean }> {
  const now = Date.now();

  if (cache && now - cache.lastUpdated < CACHE_TTL_MS) {
    return {
      indices: cache.indices,
      stocks: cache.stocks,
      isLive: true,
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // 1. Fetch live DSE indices from official homepage
    const homePromise = fetch("https://www.dse.com.bd", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: controller.signal,
      cache: "no-store",
    }).then(r => r.text()).catch(() => "");

    // 2. Fetch live DSE latest share prices
    const pricesPromise = fetch("https://www.dse.com.bd/markets/latest-share-price?sort=code", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: controller.signal,
      cache: "no-store",
    }).then(r => r.text()).catch(() => "");

    const [homeHtml, pricesHtml] = await Promise.all([homePromise, pricesPromise]);
    clearTimeout(timeoutId);

    // Parse Live Indices
    const updatedIndices: MarketIndex[] = JSON.parse(JSON.stringify(INITIAL_INDICES));

    if (homeHtml) {
      const idxRegex = /\\"key\\":\\"(DSEX|DS30|DSES)\\",\\"value\\":([0-9.]+),\\"change\\":([0-9.-]+),\\"percent\\":([0-9.-]+)/g;
      let m;
      while ((m = idxRegex.exec(homeHtml)) !== null) {
        const key = m[1];
        const val = parseFloat(m[2]);
        const chg = parseFloat(m[3]);
        const pct = parseFloat(m[4]);

        const target = updatedIndices.find(i => i.symbol === key);
        if (target) {
          target.price = +val.toFixed(2);
          target.change = +chg.toFixed(2);
          target.changePercent = +pct.toFixed(2);
          if (target.sparkline && target.sparkline.length > 0) {
            target.sparkline[target.sparkline.length - 1] = target.price;
          }
        }
      }
    }

    // Parse Live Stocks
    const updatedStocks: StockQuote[] = JSON.parse(JSON.stringify(INITIAL_STOCKS));

    if (pricesHtml) {
      const codeRegex = /\\"code\\":\\"([^\\"]+)\\",\\"price\\":\\"([0-9.]+)\\",\\"change\\":([0-9.-]+),\\"delta\\":([0-9.-]+)/g;
      let sm;
      const liveStockMap: Record<string, { price: number; changePct: number; delta: number }> = {};
      while ((sm = codeRegex.exec(pricesHtml)) !== null) {
        liveStockMap[sm[1]] = {
          price: parseFloat(sm[2]),
          changePct: parseFloat(sm[3]),
          delta: parseFloat(sm[4]),
        };
      }

      // Map to our tracked top equities
      for (const stock of updatedStocks) {
        const symbolLookup = stock.symbol === 'LHBL' ? 'LHB' : stock.symbol;
        const live = liveStockMap[symbolLookup];
        if (live && live.price > 0) {
          stock.price = +live.price.toFixed(2);
          stock.change = +live.delta.toFixed(2);
          stock.changePercent = +live.changePct.toFixed(2);
          if (stock.sparkline && stock.sparkline.length > 0) {
            stock.sparkline[stock.sparkline.length - 1] = stock.price;
          }
        }
      }
    }

    cache = {
      indices: updatedIndices,
      stocks: updatedStocks,
      lastUpdated: now,
    };

    return {
      indices: updatedIndices,
      stocks: updatedStocks,
      isLive: true,
    };
  } catch (err) {
    console.error("Live market crawl fallback:", err);
    return {
      indices: cache?.indices || INITIAL_INDICES,
      stocks: cache?.stocks || INITIAL_STOCKS,
      isLive: false,
    };
  }
}
