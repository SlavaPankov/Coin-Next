import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useBankCurrencies() {
  const {
    bankCurrencies,
    fetchBankCurrencies,
    currenciesState: { error, loading }
  } = useAppStore();

  useEffect(() => {
    fetchBankCurrencies();
  }, []);

  return {
    bankCurrencies,
    error,
    loading
  };
}
