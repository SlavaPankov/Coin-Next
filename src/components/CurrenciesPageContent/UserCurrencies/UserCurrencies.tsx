'use client';
import React from 'react';
import { useCurrenciesData } from '../../../hooks/useCurrenciesData';
import styles from './userCurrencies.module.scss';
import { H2 } from '../../Headings';

export function UserCurrencies() {
  const { currencies } = useCurrenciesData();

  return (
    <div className={styles.wrapper}>
      <H2 text={'Your currencies'} marginBottom={'25px'} />
      <ul className={styles.list}>
        {currencies.map((currency) => (
          <li key={currency.code} className={styles.item}>
            <span className={styles.code}>{currency.code}</span>
            <span className={styles.amount}>{currency.amount.toLocaleString('en-US')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
