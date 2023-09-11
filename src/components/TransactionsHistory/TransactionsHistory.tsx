import React from 'react';
import styles from './transactionsHistory.module.scss';
import { ITransaction } from '../../types/interfaces/ITransaction';
import { TransactionItem } from './TrasactionItem';

interface ITransactionHistoryProps {
  transactions: Array<ITransaction>;
  currentAccount: string;
}

export function TransactionsHistory({ transactions, currentAccount }: ITransactionHistoryProps) {
  return (
    <div className={styles.history}>
      <h3 className={styles.title}>History of transactions</h3>
      <div className={styles.head}>
        <div className={styles.fromTitle}>Sender account</div>
        <div className={styles.toTitle}>Recipient&apos;s account</div>
        <div className={styles.amountTitle}>Amount</div>
        <div className={styles.dateTitle}>Date</div>
      </div>
      <ul className={styles.list}>
        {transactions.map((transaction, index) => (
          <li key={index} className={styles.item}>
            <TransactionItem
              from={transaction.from}
              to={transaction.to}
              amount={transaction.amount}
              date={transaction.date}
              isPositiveTransfer={transaction.from !== currentAccount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
