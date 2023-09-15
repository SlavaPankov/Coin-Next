import React from 'react';
import classNames from 'classnames';
import styles from './currenciesPageContent.module.scss';
import { H1 } from '../Headings';
import { UserCurrencies } from './UserCurrencies';
import { ExchangeForm } from './ExchangeForm';
import { CurrenciesRate } from './CurrenciesRate';

export function CurrenciesPageContent() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <H1 text={'Currency exchange'} marginBottom={'56px'} />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <UserCurrencies />
          <ExchangeForm />
        </div>
        <div className={styles.right}>
          <CurrenciesRate />
        </div>
      </div>
    </div>
  );
}
