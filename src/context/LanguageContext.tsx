'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  toBnNum: (num: string | number) => string;
  isBangla: boolean;
}

// Complete bilingual dictionary for DSE Pulse Portal
export const TRANSLATIONS: Record<string, { en: string; bn: string }> = {
  // Brand & Header
  portal_subtitle: {
    en: 'Dhaka Stock Exchange & National Economy Intelligence',
    bn: 'ঢাকা স্টক এক্সচেঞ্জ ও জাতীয় অর্থনীতির তথ্যসেবা',
  },
  search_placeholder: {
    en: 'Search DSE news, companies (GP, SQURPHARMA, BRACBANK)...',
    bn: 'ডিএসই সংবাদ, কোম্পানি (জিপি, স্কয়ার ফার্মা, ব্র্যাক ব্যাংক) খুঁজুন...',
  },
  market_open: {
    en: 'DSE TRADING OPEN',
    bn: 'ডিএসই লেনদেন চলছে',
  },
  market_closed: {
    en: 'DSE TRADING CLOSED',
    bn: 'ডিএসই লেনদেন বন্ধ',
  },
  market_weekend: {
    en: 'Market Closed (Weekend)',
    bn: 'সাপ্তাহিক ছুটির দিন (বন্ধ)',
  },
  market_pre_open: {
    en: 'Pre-Opening Session',
    bn: 'প্রি-ওপেনিং সেশন',
  },
  market_post_close: {
    en: 'Post-Closing Adjustments',
    bn: 'পোস্ট-ক্লোজিং সমন্বয়',
  },
  refresh_feed: {
    en: 'Refresh News Feed',
    bn: 'সংবাদ রিফ্রেশ করুন',
  },
  saved_articles: {
    en: 'Saved Articles',
    bn: 'সংরক্ষিত সংবাদ',
  },
  theme_light: {
    en: 'Switch to Light Mode',
    bn: 'লাইট মোডে পরিবর্তন করুন',
  },
  theme_dark: {
    en: 'Switch to Dark Mode',
    bn: 'ডার্ক মোডে পরিবর্তন করুন',
  },
  lang_toggle_title: {
    en: 'Switch to বাংলা (Bangla)',
    bn: 'Switch to English (ইংরেজি)',
  },

  // Breaking Flash
  flash_alert: {
    en: 'FLASH ALERT',
    bn: 'জরুরি সংবাদ',
  },
  source: {
    en: 'Source',
    bn: 'মূল উৎস',
  },

  // Filter Bar
  all_dse_news: {
    en: 'All DSE News',
    bn: 'সব ডিএসই সংবাদ',
  },
  banking_nbfi: {
    en: 'Banks & NBFIs',
    bn: 'ব্যাংক ও আর্থিক খাত',
  },
  pharma_chemicals: {
    en: 'Pharma & Chemicals',
    bn: 'ফার্মা ও রসায়ন',
  },
  telecom_tech: {
    en: 'Telecom & Tech',
    bn: 'টেলিকম ও প্রযুক্তি',
  },
  fuel_power: {
    en: 'Fuel & Power',
    bn: 'জ্বালানি ও বিদ্যুৎ',
  },
  textile_rmg: {
    en: 'Textile & RMG',
    bn: 'টেক্সটাইল ও তৈরি পোশাক',
  },
  macro_remittance: {
    en: 'Macro & Remittance',
    bn: 'অর্থনীতি ও রেমিট্যান্স',
  },
  bsec_regulatory: {
    en: 'BSEC & Regulatory',
    bn: 'বিএসইসি ও নীতিমালা',
  },
  showing_stories: {
    en: 'Showing',
    bn: 'প্রদর্শিত হচ্ছে',
  },
  dse_stories: {
    en: 'DSE stories',
    bn: 'টি সংবাদ',
  },
  reset_all: {
    en: 'Reset all',
    bn: 'ফিল্টার মুছুন',
  },
  sort_by: {
    en: 'Sort by:',
    bn: 'সাজান:',
  },
  latest_first: {
    en: 'Latest First',
    bn: 'সর্বশেষ আগে',
  },
  most_bullish: {
    en: 'Most Bullish',
    bn: 'সর্বাধিক বুলিশ',
  },
  most_bearish: {
    en: 'Most Bearish',
    bn: 'সর্বাধিক বেয়ারিশ',
  },

  // News Card
  bullish: {
    en: 'BULLISH',
    bn: 'বুলিশ',
  },
  bearish: {
    en: 'BEARISH',
    bn: 'বেয়ারিশ',
  },
  neutral: {
    en: 'NEUTRAL',
    bn: 'নিরপেক্ষ',
  },
  just_now: {
    en: 'Just now',
    bn: 'এইমাত্র',
  },
  m_ago: {
    en: 'm ago',
    bn: ' মিনিট আগে',
  },
  h_ago: {
    en: 'h ago',
    bn: ' ঘণ্টা আগে',
  },
  d_ago: {
    en: 'd ago',
    bn: ' দিন আগে',
  },
  m_read: {
    en: 'm read',
    bn: ' মিনিট পাঠ',
  },
  read_article: {
    en: 'Read Article',
    bn: 'খবরটি পড়ুন',
  },
  copied_clipboard: {
    en: 'Article link copied to clipboard!',
    bn: 'খবরের লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে!',
  },

  // Sentiment Meter
  sentiment_meter_title: {
    en: 'DSE Sentiment Meter',
    bn: 'ডিএসই সেন্টিমেন্ট মিটার',
  },
  market_tone: {
    en: 'Current Market Tone',
    bn: 'বাজারের সামগ্রিক গতিধারা',
  },
  tone_greed: {
    en: 'Greed / Strongly Bullish',
    bn: 'তীব্র ঊর্ধ্বমুখী (বুলিশ)',
  },
  tone_mild_bullish: {
    en: 'Mildly Bullish',
    bn: 'স্বল্প ঊর্ধ্বমুখী',
  },
  tone_neutral: {
    en: 'Neutral / Balanced',
    bn: 'ভারসাম্যপূর্ণ / নিরপেক্ষ',
  },
  tone_mild_bearish: {
    en: 'Mildly Bearish',
    bn: 'স্বল্প নিম্নমুখী',
  },
  tone_fear: {
    en: 'Fear / Strongly Bearish',
    bn: 'তীব্র নিম্নমুখী (পতন)',
  },
  bullish_signals: {
    en: 'Bullish Signals',
    bn: 'বুলিশ সংকেত',
  },
  bearish_signals: {
    en: 'Bearish Signals',
    bn: 'বেয়ারিশ সংকেত',
  },
  neutral_signals: {
    en: 'Neutral Signals',
    bn: 'নিরপেক্ষ সংকেত',
  },

  // Technical Chart
  chart_title: {
    en: 'Technical Chart',
    bn: 'টেকনিক্যাল চার্ট',
  },
  chart_sub: {
    en: 'Real-time DSE Price Action',
    bn: 'রিয়েল-টাইম ডিএসই প্রাইস অ্যাকশন',
  },
  timeframe_1d: {
    en: '1D',
    bn: '১ দিন',
  },
  timeframe_1w: {
    en: '1W',
    bn: '১ সপ্তাহ',
  },
  timeframe_1m: {
    en: '1M',
    bn: '১ মাস',
  },
  timeframe_1y: {
    en: '1Y',
    bn: '১ বছর',
  },
  chart_high: {
    en: 'High',
    bn: 'সর্বোচ্চ',
  },
  chart_low: {
    en: 'Low',
    bn: 'সর্বনিম্ন',
  },
  chart_volume: {
    en: 'Volume',
    bn: 'ভলিউম',
  },

  // Watchlist & Market status
  watchlist_title: {
    en: 'Live DSE Watchlist',
    bn: 'লাইভ ডিএসই ওয়াচলিস্ট',
  },
  turnover: {
    en: 'Turnover',
    bn: 'লেনদেন',
  },
  crore_bdt: {
    en: 'Cr BDT',
    bn: 'কোটি টাকা',
  },

  // Bookmarks Modal
  saved_title: {
    en: 'Saved News Articles',
    bn: 'সংরক্ষিত সংবাদ তালিকা',
  },
  no_bookmarks: {
    en: 'No bookmarked articles yet. Click the bookmark icon on any news card to save for offline review.',
    bn: 'এখনও কোনো সংবাদ সংরক্ষণ করা হয়নি। যেকোনো সংবাদের বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।',
  },
  close: {
    en: 'Close',
    bn: 'বন্ধ করুন',
  },

  // Footer
  footer_desc: {
    en: 'Dhaka Stock Exchange & National Financial Intelligence',
    bn: 'ঢাকা স্টক এক্সচেঞ্জ ও জাতীয় আর্থিক তথ্যসেবা পোর্টাল',
  },
  all_rights_reserved: {
    en: 'All rights reserved.',
    bn: 'সর্বস্বত্ব সংরক্ষিত।',
  },
  live_dse: {
    en: 'Real-Time Live DSE',
    bn: 'রিয়েল-টাইম লাইভ ডিএসই',
  },
  trading_zone: {
    en: 'BST (GMT+6) Trading Zone',
    bn: 'বিএসটি (জিএমটি+৬) ট্রেডিং জোন',
  },

  // Loading & Empty States
  loading_news: {
    en: 'Loading fresh DSE intelligence...',
    bn: 'তাজা ডিএসই সংবাদ লোড হচ্ছে...',
  },
  no_news_match: {
    en: 'No market news matches your filter criteria.',
    bn: 'আপনার ফিল্টারের সাথে কোনো সংবাদ পাওয়া যায়নি।',
  },
  clear_filters: {
    en: 'Clear Filters',
    bn: 'ফিল্টার রিসেট করুন',
  },
};

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(val: string | number): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  return str.replace(/[0-9]/g, (digit) => BN_DIGITS[parseInt(digit, 10)] || digit);
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
  toBnNum: (num: string | number) => String(num),
  isBangla: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('dsepulse_lang') as Language;
      if (savedLang === 'en' || savedLang === 'bn') {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore
    }

    const handleStorageChange = () => {
      try {
        const savedLang = localStorage.getItem('dsepulse_lang') as Language;
        if (savedLang === 'en' || savedLang === 'bn') {
          setLanguageState(savedLang);
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('dsepulse_lang', lang);
      document.documentElement.setAttribute('lang', lang);
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event('languagechange'));
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, defaultText?: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return defaultText || key;
    return entry[language] || defaultText || entry.en || key;
  };

  const toBnNum = (num: string | number): string => {
    if (language === 'bn') {
      return toBanglaNumber(num);
    }
    return String(num);
  };

  const isBangla = language === 'bn';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        toBnNum,
        isBangla,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
