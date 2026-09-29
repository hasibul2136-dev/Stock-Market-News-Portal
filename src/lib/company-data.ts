export interface CompanyFundamentals {
  symbol: string;
  name: string;
  sector: string;
  category: 'A' | 'B' | 'N' | 'Z';
  pe: number;
  eps: number;
  nav: number;
  dividendYield: string;
  paidUpCap: string;
  marketCap: string;
  sharesOutstanding: string;
  fiftyTwoWeekRange: string;
  auditedDividend: string;
  authorizedCapital: string;
  yearEnd: string;
  listingYear: number;
  about: string;
  peers: { symbol: string; name: string; price: number; changePercent: number }[];
}

export const COMPANY_PROFILES: Record<string, CompanyFundamentals> = {
  GP: {
    symbol: 'GP',
    name: 'Grameenphone Ltd.',
    sector: 'Telecommunication',
    category: 'A',
    pe: 9.8,
    eps: 24.72,
    nav: 48.20,
    dividendYield: '5.16%',
    paidUpCap: '৳1,350.30 Cr',
    marketCap: '৳32,730 Cr',
    sharesOutstanding: '1,350.30M',
    fiftyTwoWeekRange: '৳218.00 - ৳320.00',
    auditedDividend: '125% Cash (Interim)',
    authorizedCapital: '৳4,000.00 Cr',
    yearEnd: 'December 31',
    listingYear: 2009,
    about: 'Grameenphone is the leading telecommunications service provider in Bangladesh, operating a nationwide cellular network and digital solutions ecosystem across all 64 districts.',
    peers: [
      { symbol: 'ROBI', name: 'Robi Axiata PLC', price: 30.00, changePercent: 0.67 },
      { symbol: 'BSCCS', name: 'Bangladesh Submarine Cable', price: 162.00, changePercent: -0.40 },
    ]
  },
  SQURPHARMA: {
    symbol: 'SQURPHARMA',
    name: 'Square Pharmaceuticals PLC',
    sector: 'Pharmaceuticals & Chemicals',
    category: 'A',
    pe: 10.4,
    eps: 21.41,
    nav: 124.50,
    dividendYield: '5.05%',
    paidUpCap: '৳886.45 Cr',
    marketCap: '৳19,289 Cr',
    sharesOutstanding: '886.45M',
    fiftyTwoWeekRange: '৳198.00 - ৳236.00',
    auditedDividend: '110% Cash',
    authorizedCapital: '৳1,000.00 Cr',
    yearEnd: 'June 30',
    listingYear: 1995,
    about: 'Square Pharmaceuticals is the largest pharmaceutical manufacturer in Bangladesh, with substantial global export operations across 40+ countries and state-of-the-art US FDA standard facilities.',
    peers: [
      { symbol: 'RENATA', name: 'Renata PLC', price: 452.60, changePercent: 0.35 },
      { symbol: 'BXPHARMA', name: 'Beximco Pharmaceuticals', price: 102.50, changePercent: 0.20 },
      { symbol: 'ACME', name: 'The ACME Laboratories', price: 78.40, changePercent: -0.15 },
    ]
  },
  BATBC: {
    symbol: 'BATBC',
    name: 'British American Tobacco Bangladesh',
    sector: 'Food & Allied',
    category: 'A',
    pe: 6.8,
    eps: 33.11,
    nav: 92.40,
    dividendYield: '4.44%',
    paidUpCap: '৳540.00 Cr',
    marketCap: '৳12,166 Cr',
    sharesOutstanding: '540.00M',
    fiftyTwoWeekRange: '৳220.00 - ৳395.00',
    auditedDividend: '100% Cash',
    authorizedCapital: '৳540.00 Cr',
    yearEnd: 'December 31',
    listingYear: 1977,
    about: 'British American Tobacco Bangladesh is one of the highest corporate taxpayers in Bangladesh, manufacturing consumer goods and managing widespread contract farming agricultural networks.',
    peers: [
      { symbol: 'OLYMPIC', name: 'Olympic Industries', price: 148.50, changePercent: 1.10 },
      { symbol: 'UNILEVERCL', name: 'Unilever Consumer Care', price: 1980.00, changePercent: 0.10 },
    ]
  },
  BRACBANK: {
    symbol: 'BRACBANK',
    name: 'BRAC Bank PLC',
    sector: 'Banking',
    category: 'A',
    pe: 8.2,
    eps: 7.85,
    nav: 41.20,
    dividendYield: '3.50%',
    paidUpCap: '৳1,612.30 Cr',
    marketCap: '৳10,380 Cr',
    sharesOutstanding: '1,612.30M',
    fiftyTwoWeekRange: '৳38.00 - ৳66.00',
    auditedDividend: '15% Cash + 7.5% Stock',
    authorizedCapital: '৳2,500.00 Cr',
    yearEnd: 'December 31',
    listingYear: 2007,
    about: 'BRAC Bank is a private commercial bank pioneer in SME financing, retail banking, and foreign institutional investment custody in Bangladesh, recognized for strong corporate governance.',
    peers: [
      { symbol: 'CITYBANK', name: 'City Bank PLC', price: 24.80, changePercent: 0.81 },
      { symbol: 'EBL', name: 'Eastern Bank PLC', price: 31.20, changePercent: 0.40 },
      { symbol: 'PUBALIBANK', name: 'Pubali Bank PLC', price: 28.50, changePercent: 0.35 },
    ]
  },
  WALTONHIL: {
    symbol: 'WALTONHIL',
    name: 'Walton Hi-Tech Industries PLC',
    sector: 'Engineering',
    category: 'A',
    pe: 14.5,
    eps: 23.70,
    nav: 268.00,
    dividendYield: '4.36%',
    paidUpCap: '৳302.93 Cr',
    marketCap: '৳10,405 Cr',
    sharesOutstanding: '302.93M',
    fiftyTwoWeekRange: '৳330.00 - ৳680.00',
    auditedDividend: '350% Cash',
    authorizedCapital: '৳600.00 Cr',
    yearEnd: 'June 30',
    listingYear: 2020,
    about: 'Walton Hi-Tech Industries is Bangladesh’s flagship electrical, electronics, and smart home appliances conglomerate, manufacturing refrigerators, televisions, air conditioners, and compressors.',
    peers: [
      { symbol: 'BBS', name: 'Bangladesh Building Systems', price: 14.20, changePercent: -0.70 },
      { symbol: 'SINGERBD', name: 'Singer Bangladesh', price: 128.50, changePercent: 0.20 },
    ]
  },
  RENATA: {
    symbol: 'RENATA',
    name: 'Renata PLC',
    sector: 'Pharmaceuticals & Chemicals',
    category: 'A',
    pe: 16.2,
    eps: 28.10,
    nav: 280.00,
    dividendYield: '2.00%',
    paidUpCap: '৳114.70 Cr',
    marketCap: '৳5,190 Cr',
    sharesOutstanding: '114.70M',
    fiftyTwoWeekRange: '৳430.00 - ৳740.00',
    auditedDividend: '62.5% Cash',
    authorizedCapital: '৳250.00 Cr',
    yearEnd: 'June 30',
    listingYear: 1979,
    about: 'Renata is one of the fastest-growing pharmaceutical and animal health companies in Bangladesh, leading in contract manufacturing for global biopharma innovators.',
    peers: [
      { symbol: 'SQURPHARMA', name: 'Square Pharmaceuticals', price: 217.60, changePercent: 0.23 },
      { symbol: 'BXPHARMA', name: 'Beximco Pharmaceuticals', price: 102.50, changePercent: 0.20 },
    ]
  },
  LHBL: {
    symbol: 'LHBL',
    name: 'LafargeHolcim Bangladesh PLC',
    sector: 'Cement',
    category: 'A',
    pe: 11.8,
    eps: 5.25,
    nav: 19.40,
    dividendYield: '8.09%',
    paidUpCap: '৳1,161.37 Cr',
    marketCap: '৳7,177 Cr',
    sharesOutstanding: '1,161.37M',
    fiftyTwoWeekRange: '৳58.00 - ৳72.00',
    auditedDividend: '50% Cash',
    authorizedCapital: '৳1,400.00 Cr',
    yearEnd: 'December 31',
    listingYear: 2003,
    about: 'LafargeHolcim Bangladesh is an integrated building materials manufacturer operating the cross-border conveyor belt connecting Meghalaya limestone quarries with its Chhatak plant.',
    peers: [
      { symbol: 'HEIDELBCEM', name: 'Heidelberg Cement', price: 215.00, changePercent: 0.50 },
      { symbol: 'CROWNCMNT', name: 'Crown Cement PLC', price: 68.20, changePercent: -0.30 },
    ]
  },
  BEXIMCO: {
    symbol: 'BEXIMCO',
    name: 'Beximco Limited',
    sector: 'Miscellaneous & Diversified',
    category: 'B',
    pe: 15.0,
    eps: 1.48,
    nav: 94.50,
    dividendYield: '2.26%',
    paidUpCap: '৳876.32 Cr',
    marketCap: '৳1,935 Cr',
    sharesOutstanding: '876.32M',
    fiftyTwoWeekRange: '৳20.00 - ৳115.60',
    auditedDividend: '5% Cash',
    authorizedCapital: '৳1,000.00 Cr',
    yearEnd: 'June 30',
    listingYear: 1989,
    about: 'Beximco Limited is the flagship entity of the Beximco Group, with business segments spanning textiles, real estate, synthetics, and renewable green energy sukuk investments.',
    peers: [
      { symbol: 'ENVOYTEX', name: 'Envoy Textiles', price: 42.50, changePercent: 1.40 },
      { symbol: 'SKTRIMS', name: 'SK Trims & Industries', price: 18.40, changePercent: 0.80 },
    ]
  },
  ROBI: {
    symbol: 'ROBI',
    name: 'Robi Axiata PLC',
    sector: 'Telecommunication',
    category: 'A',
    pe: 18.2,
    eps: 1.65,
    nav: 13.80,
    dividendYield: '3.33%',
    paidUpCap: '৳5,237.93 Cr',
    marketCap: '৳15,713 Cr',
    sharesOutstanding: '5,237.93M',
    fiftyTwoWeekRange: '৳24.00 - ৳32.50',
    auditedDividend: '10% Cash',
    authorizedCapital: '৳6,000.00 Cr',
    yearEnd: 'December 31',
    listingYear: 2020,
    about: 'Robi Axiata is the second largest mobile operator in Bangladesh, majority owned by Axiata Group Berhad and Bharti Airtel, holding the largest 4G spectrum block in the nation.',
    peers: [
      { symbol: 'GP', name: 'Grameenphone Ltd.', price: 242.40, changePercent: -0.45 },
    ]
  },
  CITYBANK: {
    symbol: 'CITYBANK',
    name: 'City Bank PLC',
    sector: 'Banking',
    category: 'A',
    pe: 5.6,
    eps: 4.42,
    nav: 31.50,
    dividendYield: '6.05%',
    paidUpCap: '৳1,304.50 Cr',
    marketCap: '৳3,235 Cr',
    sharesOutstanding: '1,304.50M',
    fiftyTwoWeekRange: '৳21.00 - ৳26.50',
    auditedDividend: '15% Cash + 10% Stock',
    authorizedCapital: '৳2,000.00 Cr',
    yearEnd: 'December 31',
    listingYear: 1986,
    about: 'City Bank is one of the oldest private commercial banks in Bangladesh, renowned for introducing American Express credit cards, agent banking networks, and digital financial innovation.',
    peers: [
      { symbol: 'BRACBANK', name: 'BRAC Bank PLC', price: 64.40, changePercent: 0.63 },
      { symbol: 'EBL', name: 'Eastern Bank PLC', price: 31.20, changePercent: 0.40 },
    ]
  }
};
