import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useCurrenciesData() {
  const {
    currencies,
    currenciesState: { error, loading },
    fetchCurrency,
    token
  } = useAppStore();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetchCurrency(token);
  }, []);

  return {
    currencies,
    error,
    loading
  };
}
