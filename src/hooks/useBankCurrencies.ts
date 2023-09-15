import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useBankCurrencies() {
  const { bankCurrencies, fetchBankCurrencies } = useAppStore();

  useEffect(() => {
    fetchBankCurrencies();
  }, []);

  return {
    bankCurrencies
  };
}
