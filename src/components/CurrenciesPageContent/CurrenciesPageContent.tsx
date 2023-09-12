import React from 'react';
import classNames from 'classnames';
import styles from './currenciesPageContent.module.scss';
import { H1 } from '../Headings';
import { UserCurrencies } from './UserCurrencies';

export function CurrenciesPageContent() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <H1 text={'Currency exchange'} marginBottom={'56px'} />
      <UserCurrencies />
    </div>
  );
}
