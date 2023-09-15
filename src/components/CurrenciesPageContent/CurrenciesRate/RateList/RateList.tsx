import React from 'react';
import styles from './rateList.module.scss';
import { ICurrencyFeed } from '../../../../types/interfaces/ICurrencyFeed';
import { RateDownIcon, RateUpIcon } from '../../../Icons';

interface IRateListProps {
  list: Array<ICurrencyFeed>;
}

export function RateList({ list }: IRateListProps) {
  return (
    <ul className={styles.list}>
      {list.map((item, index) => (
        <li
          key={index}
          className={`${styles.item} ${
            item.change === 1 ? `${styles.rateUp}` : `${styles.rateDown}`
          }`}>
          <span className={styles.code}>
            {item.from}/{item.to}
          </span>
          <span className={styles.amount}>
            {item.rate}
            {item.change === 1 ? <RateUpIcon /> : <RateDownIcon />}
          </span>
        </li>
      ))}
    </ul>
  );
}
