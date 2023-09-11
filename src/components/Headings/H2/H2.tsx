import React from 'react';
import styles from './h2.module.scss';

interface IH2Props {
  text: string;
  marginBottom?: string;
}

export function H2({ text, marginBottom = '0' }: IH2Props) {
  return (
    <h2 className={styles.heading} style={{ marginBottom }}>
      {text}
    </h2>
  );
}
