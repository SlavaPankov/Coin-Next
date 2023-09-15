import React from 'react';
import classNames from 'classnames';
import styles from './currenciesPageContent.module.scss';
import { H1 } from '../Headings';
import { UserCurrencies } from './UserCurrencies';
import { ExchangeForm } from './ExchangeForm';

export function CurrenciesPageContent() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <H1 text={'Currency exchange'} marginBottom={'56px'} />
      <div className={styles.wrapper}>
        <UserCurrencies />
        <ExchangeForm />
      </div>
    </div>
  );
}
