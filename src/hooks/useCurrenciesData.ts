import { useAppStore } from '../store/store';
import { useEffect } from 'react';

export function useCurrenciesData() {
  const { currencies, fetchCurrency, token } = useAppStore();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetchCurrency(token);
  }, []);

  return {
    currencies
  };
}
