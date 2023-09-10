import React, { useState } from 'react';
import styles from './accountsHead.module.scss';
import { H1 } from '../../Headings';
import { ButtonWithIcon } from '../../ButtonWithIcon';
import { PlusIcon } from '../../Icons';
import { Dropdown } from '../../Dropdown';
import { TextContent } from '../../TextContent';

export function AccountsHead() {
  const [isDropdownOpen] = useState<boolean>(false);

  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className={styles.head}>
      <H1 text={'Your accounts'} />
      <Dropdown button={'Sorting'} isOpen={isDropdownOpen}>
        <ul className={styles.list}>
          <li onClick={handleClick} className={styles.item}>
            <TextContent text={'By account number'} />
          </li>
          <li onClick={handleClick} className={styles.item}>
            <TextContent text={'By balance'} />
          </li>
          <li onClick={handleClick} className={styles.item}>
            <TextContent text={'By last transaction'} />
          </li>
        </ul>
      </Dropdown>
      <ButtonWithIcon icon={<PlusIcon />} text={'Create a new account'} />
    </div>
  );
}
