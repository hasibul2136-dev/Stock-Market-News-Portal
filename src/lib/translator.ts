/**
 * Smart Financial Headline Translator & Lexicon for DSE Pulse
 * Translates and localized Bangladeshi stock market terms, financial actions, and news headlines.
 */

const EXACT_HEADLINES: Record<string, string> = {
  'BSEC fines Bangladesh Race Management Tk5 lakh for securities rules violation':
    'সিকিউরিটিজ নিয়ম লঙ্ঘনের দায়ে বাংলাদেশ রেস ম্যানেজমেন্টকে ৫ লাখ টাকা জরিমানা করল বিএসইসি',
  'Govt lifts 16-year ban on direct listing':
    'সরাসরি তালিকায় ১৬ বছরের নিষেধাজ্ঞা প্রত্যাহার করল সরকার',
  'Stocks slump as selling pressure mounts ahead of dividend season':
    'লভ্যাংশ মৌসুমের আগে বিক্রির চাপে শেয়ারবাজারে সূচকের পতন',
  'Apex Foods shares jump 19% as profit soars 121% in FY26':
    'মুনাফা ১২১% বাড়ায় এপেক্স ফুডসের শেয়ারদর বাড়ল ১৯%',
  'Transparent reporting, ownership structures key to restoring investor trust: Tanvir Gani':
    'বিনিয়োগকারীদের আস্থা ফেরাতে স্বচ্ছ রিপোর্টিং ও সুশাসন জরুরি: তানভীর গণি',
  'Square Pharmaceuticals reports 14% revenue surge in Q3':
    'তৃতীয় প্রান্তিকে স্কয়ার ফার্মাসিউটিক্যালসের আয় ১৪% বৃদ্ধি',
  'Grameenphone declares 125% interim cash dividend':
    'গ্রামীণফোন ১২৫% অন্তর্বর্তীকালীন নগদ লভ্যাংশ ঘোষণা করেছে',
  'BRAC Bank deposits cross milestone BDT 60,000 crore':
    'ব্র্যাক ব্যাংকের আমানত ৬০,০০০ কোটি টাকার মাইলফলক অতিক্রম করেছে',
  'BEXIMCO sukuk bond trading draws massive institutional interest':
    'বেক্সিমকো সুকুক বন্ডের লেনদেনে প্রাতিষ্ঠানিক বিনিয়োগকারীদের ব্যাপক আগ্রহ',
  'DSE turnover crosses Tk 800 crore amid banking rally':
    'ব্যাংকিং খাতের চাঙাভাবের মধ্যে ডিএসইর লেনদেন ৮০০ কোটি টাকা ছাড়াল',
  'Bangladesh Bank keeps policy repo rate steady at 10%':
    'নীতি সুদহার (রেপো রেট) ১০ শতাংশে অপরিবর্তিত রাখল বাংলাদেশ ব্যাংক',
};

const PHRASE_REPLACEMENTS: [RegExp, string][] = [
  [/shares jump (\d+)%/gi, 'শেয়ারদর $1% বৃদ্ধি'],
  [/profit soars (\d+)%/gi, 'মুনাফা $1% বৃদ্ধি'],
  [/revenue surge/gi, 'রাজস্ব বৃদ্ধি'],
  [/cash dividend/gi, 'নগদ লভ্যাংশ'],
  [/stock dividend/gi, 'বোনাস লভ্যাংশ'],
  [/selling pressure/gi, 'বিক্রির চাপ'],
  [/buying pressure/gi, 'কেনার চাপ'],
  [/investor trust/gi, 'বিনিয়োগকারীদের আস্থা'],
  [/direct listing/gi, 'সরাসরি তালিকাভুক্তি'],
  [/securities rules violation/gi, 'সিকিউরিটিজ আইন লঙ্ঘন'],
  [/fines (.*?) Tk(\d+) lakh/gi, 'জরিমানা $2 লাখ টাকা'],
  [/reports (\d+)% growth/gi, '$1% প্রবৃদ্ধি প্রকাশ'],
  [/declares (\d+)% dividend/gi, '$1% লভ্যাংশ ঘোষণা'],
  [/interim dividend/gi, 'অন্তর্বর্তীকালীন লভ্যাংশ'],
  [/policy rate/gi, 'নীতি সুদহার'],
  [/central bank/gi, 'বাংলাদেশ ব্যাংক'],
  [/financial year/gi, 'অর্থবছর'],
  [/mutual funds/gi, 'মিউচুয়াল ফান্ড'],
  [/stock exchange/gi, 'স্টক এক্সচেঞ্জ'],
];

export function translateHeadline(title: string): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (EXACT_HEADLINES[trimmed]) {
    return EXACT_HEADLINES[trimmed];
  }

  // Partial phrase substitutions
  let translated = trimmed;
  for (const [regex, replacement] of PHRASE_REPLACEMENTS) {
    translated = translated.replace(regex, replacement);
  }

  return translated;
}

export const CATEGORY_BN: Record<string, string> = {
  banking: 'ব্যাংক ও আর্থিক প্রতিষ্ঠান',
  pharma: 'ফার্মা ও রসায়ন',
  telecom: 'টেলিকম ও প্রযুক্তি',
  fuel_power: 'জ্বালানি ও বিদ্যুৎ',
  textile: 'টেক্সটাইল ও তৈরি পোশাক',
  macro: 'ম্যাক্রো অর্থনীতি',
  regulatory: 'বিএসইসি ও নীতিমালা',
  all: 'সব সংবাদ',
};
