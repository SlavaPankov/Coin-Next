import React from 'react';
import styles from './h1.module.scss';

interface IH1Props {
  text: string;
  marginBottom?: string;
}

export function H1({ text, marginBottom = '0' }: IH1Props) {
  return (
    <h1 style={{ marginBottom }} className={styles.heading}>
      {text}
    </h1>
  );
}
