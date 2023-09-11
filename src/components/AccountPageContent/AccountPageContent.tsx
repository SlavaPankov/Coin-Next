'use client';
import React from 'react';
import classNames from 'classnames';
import styles from './accountPageContainer.module.scss';
import { useAccountData } from '../../hooks/useAccountData';
import { AccountHead } from './AccountHead';

interface IAccountPageContentProps {
  id: string;
}

export function AccountPageContent({ id }: IAccountPageContentProps) {
  const { account } = useAccountData(id);

  const containerClassname = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassname}>
      <AccountHead balance={account.balance} account={account.account} />
    </div>
  );
}
