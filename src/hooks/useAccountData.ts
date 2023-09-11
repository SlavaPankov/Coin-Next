import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useAccountData(id: string) {
  const {
    account,
    accountState: { error, loading },
    fetchAccount,
    token
  } = useAppStore();

  useEffect(() => {
    if (!id || !token) {
      return;
    }

    fetchAccount(id, token);
  }, [token]);

  return {
    account,
    error,
    loading
  };
}
