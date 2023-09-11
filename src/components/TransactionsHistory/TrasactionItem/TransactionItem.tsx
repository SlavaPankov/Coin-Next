import React from 'react';
import styles from './transactionItem.module.scss';
import classNames from 'classnames';

interface ITransactionItemProps {
  from: string;
  to: string;
  amount: number;
  date: string;
  isPositiveTransfer: boolean;
}

export function TransactionItem({
  from,
  to,
  amount,
  date,
  isPositiveTransfer
}: ITransactionItemProps) {
  const amountClassName = classNames({
    [`${styles.amount}`]: true,
    [`${styles.minus}`]: !isPositiveTransfer
  });

  return (
    <div className={styles.item}>
      <div className={styles.from}>{from}</div>
      <div className={styles.to}>{to}</div>
      <div className={amountClassName}>
        {isPositiveTransfer
          ? `+ ${amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
          : `- ${amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
      </div>
      <div className={styles.date}>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}
