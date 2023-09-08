'use client';
import React from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { HeaderNav } from './HeaderNav';
import { usePathname } from 'next/navigation';
import { ERoutes } from '../../types/enums/ERoutes';

export function Header() {
  const pathName = usePathname();
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <header className={styles.header}>
      <div className={containerClassName}>
        <Link className={styles.link} href="/">
          Coin.
        </Link>
        {pathName !== ERoutes.login && <HeaderNav />}
      </div>
    </header>
  );
}
