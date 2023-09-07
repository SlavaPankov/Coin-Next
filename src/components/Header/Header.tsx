'use client';

import React from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

export function Header() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <header className={styles.header}>
      <div className={containerClassName}>
        <Link className={styles.link} href="/">
          Coin.
        </Link>
      </div>
    </header>
  );
}
