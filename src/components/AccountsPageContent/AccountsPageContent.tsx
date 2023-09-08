'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './accountsPageContent.module.scss';
import { AccountsHead } from './AccountsHead';

export function AccountsPageContent() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <AccountsHead />
    </div>
  );
}
