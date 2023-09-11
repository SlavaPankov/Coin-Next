'use client';
import React, { useEffect } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { HeaderNav } from './HeaderNav';
import { usePathname } from 'next/navigation';
import { ERoutes } from '../../types/enums/ERoutes';
import { useAppStore } from '../../store/store';

export function Header() {
  const { token, setToken } = useAppStore();
  const pathName = usePathname();
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  useEffect(() => {
    if (token) {
      return;
    }

    const cookieObject = Object.fromEntries(
      document.cookie.split(';').map((item) => item.trim().split('='))
    );

    if (cookieObject.token) {
      setToken(cookieObject.token);
    }
  }, []);

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
