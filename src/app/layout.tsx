import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DSE Pulse | Dhaka Stock Exchange (DSE) News & Financial Terminal',
  description: 'Live Dhaka Stock Exchange (DSE) news aggregator, Bangladeshi company sentiment analysis, DSEX/DS30 ticker, and capital market intelligence.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#090d16] dark:text-slate-100 transition-colors duration-200 antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
