import React, { useEffect, useState } from 'react';
import styles from './accountsList.module.scss';
import { AccountCard } from './AccountCard';
import { useAccountsData } from '../../../hooks/useAccountsData';

export function AccountsList() {
  const [isClient, setIsClient] = useState(false);
  const { accounts, loading, error } = useAccountsData();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && !loading && !error && accounts.length > 0 && (
        <ul className={styles.list}>
          {accounts.map((account) => (
            <li key={account.account}>
              <AccountCard
                account={account.account}
                balance={account.balance}
                lastTransaction={account.transactions[0].date}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
