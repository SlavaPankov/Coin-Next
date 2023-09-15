'use client';
import React, { useEffect } from 'react';
import styles from './currenciesRate.module.scss';
import { H2 } from '../../Headings';
import { RateList } from './RateList';
import { useAppStore } from '../../../store/store';

export function CurrenciesRate() {
  const { getCurrenciesFeed, currenciesFeed } = useAppStore();

  useEffect(() => {
    getCurrenciesFeed();
  }, []);

  useEffect(() => {
    if (currenciesFeed.length) {
      console.log(currenciesFeed);
    }
  }, [currenciesFeed]);

  return (
    <div className={styles.rate}>
      <H2 text={'Change rates in real time'} marginBottom={'25px'} />
      <RateList list={currenciesFeed} />
    </div>
  );
}
