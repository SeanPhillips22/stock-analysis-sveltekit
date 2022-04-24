export type Type = 'stocks' | 'etf';
export type Time = '1D' | '5D' | '1M' | 'YTD' | '1Y' | '5Y' | 'MAX';
export type ChartData = { c: number; t: string; o?: number }[];
