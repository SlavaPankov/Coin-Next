import React from 'react';
import styles from './accountCard.module.scss';
import { Button } from '../../../Button';

interface IAccountCardProps {
  account: string;
  balance: number;
  lastTransaction: string;
}

export function AccountCard({ account, balance, lastTransaction }: IAccountCardProps) {
  const convertDate = (dateString: string): string => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className={styles.card}>
      <h3 className={styles.account}>{account}</h3>
      <div className={styles.balance}>{balance.toLocaleString('en-US')}</div>
      <div className={styles.cardFooter}>
        <div className={styles.transactions}>
          Last transaction: <span>{convertDate(lastTransaction)}</span>
        </div>
        <Button text={'Open'} />
      </div>
    </article>
  );
}
