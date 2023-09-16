import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useBanksData() {
  const {
    banks,
    banksState: { error },
    fetchBanks
  } = useAppStore();

  useEffect(() => {
    if (banks.length) {
      return;
    }

    fetchBanks();
  }, []);

  return {
    banks,
    error
  };
}
