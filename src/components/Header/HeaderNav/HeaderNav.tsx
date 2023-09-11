import React, { MouseEvent } from 'react';
import styles from './headerNav.module.scss';
import Link from 'next/link';
import { ERoutes } from '../../../types/enums/ERoutes';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/store';

export function HeaderNav() {
  const router = useRouter();
  const pathParams = usePathname();
  const { clear } = useAppStore();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.cookie = `token=; path=/; max-age=-1`;
    clear();

    router.push(ERoutes.login);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link
            href={ERoutes.banks}
            className={`${styles.link} ${ERoutes.banks === pathParams ? styles.link_active : ''}`}>
            Banks
          </Link>
        </li>
        <li>
          <Link
            href={ERoutes.accounts}
            className={`${styles.link} ${
              pathParams === ERoutes.accounts ? styles.link_active : ''
            }`}>
            Accounts
          </Link>
        </li>
        <li>
          <Link
            href={ERoutes.currency}
            className={`${styles.link} ${
              pathParams === ERoutes.currency ? styles.link_active : ''
            }`}>
            Currency
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} href={ERoutes.logout} className={styles.link}>
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}
