import React, { useState, MouseEvent } from 'react';
import styles from './accountsHead.module.scss';
import { H1 } from '../../Headings';
import { ButtonWithIcon } from '../../ButtonWithIcon';
import { CheckIcon, PlusIcon } from '../../Icons';
import { Dropdown } from '../../Dropdown';
import { TextContent } from '../../TextContent';
import { useAppStore } from '../../../store/store';

export function AccountsHead() {
  const [isDropdownOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('');
  const { sortingAccounts, createAccount, token } = useAppStore();

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    sortingAccounts(event.currentTarget.dataset.sort || '');
    setSortType(event.currentTarget.dataset.sort || '');
  };

  const handleCreateClick = () => {
    createAccount(token);
  };

  return (
    <div className={styles.head}>
      <H1 text={'Your accounts'} />
      <Dropdown button={'Sorting'} isOpen={isDropdownOpen}>
        <ul className={styles.list}>
          <li
            onClick={handleClick}
            className={`${styles.item} ${sortType === '0' ? styles.itemActive : ''}`}
            data-sort={'0'}>
            <TextContent text={'By account number'} />
            {sortType === '0' && <CheckIcon />}
          </li>
          <li
            onClick={handleClick}
            className={`${styles.item} ${sortType === '1' ? styles.itemActive : ''}`}
            data-sort={'1'}>
            <TextContent text={'By balance'} />
            {sortType === '1' && <CheckIcon />}
          </li>
          <li
            onClick={handleClick}
            className={`${styles.item} ${sortType === '2' ? styles.itemActive : ''}`}
            data-sort={'2'}>
            <TextContent text={'By last transaction'} />
            {sortType === '2' && <CheckIcon />}
          </li>
        </ul>
      </Dropdown>
      <ButtonWithIcon
        onClick={handleCreateClick}
        icon={<PlusIcon />}
        text={'Create a new account'}
      />
    </div>
  );
}
