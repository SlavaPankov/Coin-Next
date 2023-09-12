'use client';
import React from 'react';
import { useCurrenciesData } from '../../../hooks/useCurrenciesData';

export function UserCurrencies() {
  const { currencies } = useCurrenciesData();

  return (
    <ul>
      {currencies.map((currency) => (
        <li key={currency.code}>
          {currency.code} - {currency.amount}
        </li>
      ))}
    </ul>
  );
}
