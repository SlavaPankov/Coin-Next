import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useAccountsData() {
  const {
    accounts,
    accountsState: { loading, error },
    fetchAccounts,
    token
  } = useAppStore();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetchAccounts(token);
  }, [token]);

  return {
    accounts,
    loading,
    error
  };
}
