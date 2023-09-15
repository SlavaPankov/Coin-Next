'use client';
import React, { ChangeEvent, useEffect, useState, MouseEvent, FormEvent } from 'react';
import styles from './exchangeForm.module.scss';
import { H2 } from '../../Headings';
import { useBankCurrencies } from '../../../hooks/useBankCurrencies';
import { InputField } from '../../InputField';
import { IFormData } from '../../../types/interfaces/IFormData';
import { Button } from '../../Button';
import { Select } from '../../Select';
import { useAppStore } from '../../../store/store';

enum EFieldsNames {
  from = 'from',
  to = 'to',
  amount = 'amount'
}

export function ExchangeForm() {
  const { token, buyCurrency } = useAppStore();
  const { bankCurrencies, error, loading } = useBankCurrencies();
  const [formData, setFormData] = useState<IFormData>({});

  const handlerSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    const { name, value } = event.currentTarget.dataset;

    if (!name || !value) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget).entries());

    buyCurrency(token, formData as { [k: string]: string });
  };

  useEffect(() => {
    if (!bankCurrencies.length) {
      return;
    }

    setFormData({
      ...formData,
      [EFieldsNames.from]: bankCurrencies[0],
      [EFieldsNames.to]: bankCurrencies[0]
    });
  }, [bankCurrencies]);

  return (
    <div className={styles.wrapper}>
      <H2 text={'Currency exchange'} marginBottom={'25px'} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.currencies}>
          <div className={styles.select}>
            <Select
              label={EFieldsNames.from}
              name={EFieldsNames.from}
              value={formData[EFieldsNames.from] || ''}>
              <ul className={styles.currencyList}>
                {bankCurrencies.map((currency) => (
                  <li
                    onClick={handleClick}
                    className={styles.item}
                    key={currency}
                    data-value={currency}
                    data-name={EFieldsNames.from}>
                    {currency}
                  </li>
                ))}
              </ul>
            </Select>
          </div>
          <div className={styles.select}>
            <Select
              label={EFieldsNames.to}
              name={EFieldsNames.to}
              value={formData[EFieldsNames.to] || ''}>
              <ul className={styles.currencyList}>
                {bankCurrencies.map((currency) => (
                  <li
                    onClick={handleClick}
                    className={styles.item}
                    key={currency}
                    data-value={currency}
                    data-name={EFieldsNames.to}>
                    {currency}
                  </li>
                ))}
              </ul>
            </Select>
          </div>
        </div>
        <div>
          <InputField
            label={'Amount'}
            value={formData[EFieldsNames.amount] || ''}
            name={EFieldsNames.amount}
            onChange={handlerSubmit}
          />
        </div>
        <Button text={'Exchange'} />
      </form>
      {error && !loading && <div className={styles.error}>{error}</div>}
    </div>
  );
}
