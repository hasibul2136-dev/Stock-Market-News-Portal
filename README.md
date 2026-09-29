# DSE Pulse | Dhaka Stock Exchange (DSE) Web Portal & Financial Terminal

A full-stack, multi-page financial intelligence web portal and stock market news terminal built for the **Dhaka Stock Exchange (DSE)** and Bangladesh's Capital Market.

Powered by **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Interactive SVG Technical Charts**.

---

## 🌐 Public Live Web Access

- **Public Live URL**: [https://spicy-hornets-wish.loca.lt](https://spicy-hornets-wish.loca.lt)
- **Tunnel Password / IP (if prompted by localtunnel)**: `202.51.184.170`
- **Local Access**: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Multi-Page Web Portal Architecture

1. **Dashboard Home (`/`)**:
   - Continuous live DSE ticker marquee (`GP`, `SQURPHARMA`, `BATBC`, `BRACBANK`, `WALTONHIL`, `RENATA`, `LHBL`, `BEXIMCO`, `ROBI`, `CITYBANK`).
   - Major indices overview (`DSEX`, `DS30`, `DSES`, `CASPI`, `USD/BDT`, `CALL MONEY`).
   - Breaking flash news banner.
   - Verified Bangladeshi market headlines from **The Business Standard (TBS)** with real image previews.
   - DSE Sentiment Gauge & Economic Radar (BB Repo rate, Forex reserves, Turnover).
   - Light and Dark terminal theme toggle.

2. **Dedicated Company Profiles (`/stocks/[symbol]`)**:
   - Example: `/stocks/GP`, `/stocks/SQURPHARMA`, `/stocks/BATBC`, `/stocks/BRACBANK`
   - Complete fundamentals: P/E Ratio, EPS (TTM), NAV Per Share, Dividend Yield, Paid-up Capital, Market Cap, Shares Outstanding, 52-Week Range.
   - Interactive technical chart (Timeframes: 1D, 1W, 1M, 1Y; Styles: Area & Candlestick).
   - Order book depth simulation (Bid vs. Ask volumes).
   - Sector peer comparison table.
   - Company-specific news intelligence.

3. **Full News Reader (`/news/[id]`)**:
   - Example: `/news/tbs-1556786`
   - High-resolution editorial image.
   - Sentiment analysis pill with exact score.
   - Tagged ticker chips linking directly to company profiles.
   - Readability-optimized layout with related DSE market stories.

---

## ☁️ Permanent Cloud Deployment (Vercel / Netlify)

### Deploying to Vercel (Recommended):
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Deploy in 1 command:
   ```bash
   vercel
   ```
3. Follow the CLI prompt to claim your permanent custom domain (e.g. `https://dsepulse.vercel.app`).
