import React from 'react';
import styles from './loader.module.scss';

export function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={'spinner spinner-1'}></div>
    </div>
  );
}
