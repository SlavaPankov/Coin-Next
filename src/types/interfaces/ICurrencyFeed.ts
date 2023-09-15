export interface ICurrencyFeed {
  type: string;
  from: string;
  to: string;
  rate: number;
  change: 1 | -1;
}
