import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('dsepulse_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = saved !== null ? saved === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                  var savedLang = localStorage.getItem('dsepulse_lang');
                  if (savedLang) {
                    document.documentElement.setAttribute('lang', savedLang);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#090d16] dark:text-slate-100 transition-colors duration-200 antialiased selection:bg-emerald-500 selection:text-black">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
