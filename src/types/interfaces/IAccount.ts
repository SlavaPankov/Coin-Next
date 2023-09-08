import { ITransaction } from './ITransaction';

export interface IAccount {
  account: string;
  balance: number;
  transaction: Array<ITransaction>;
}
