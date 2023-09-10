import { ITransaction } from './ITransaction';

export interface IAccount {
  account: string;
  balance: number;
  mine: boolean;
  transactions: Array<ITransaction>;
}
