import React from 'react';
import styles from './accountHead.module.scss';
import { H1 } from '../../Headings';
import { ButtonWithIcon } from '../../ButtonWithIcon';
import { GoBackIcon } from '../../Icons';
import { TextContent } from '../../TextContent';
import { useRouter } from 'next/navigation';

interface IAccountHeadProps {
  account: string;
  balance: number;
}

export function AccountHead({ account, balance }: IAccountHeadProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className={styles.head}>
      <div className={styles.headTop}>
        <H1 text={'View your account'} />
        <ButtonWithIcon icon={<GoBackIcon />} text={'Go back'} onClick={handleClick} />
      </div>
      <div className={styles.headBottom}>
        <TextContent
          text={`№ ${account}`}
          fontSize={'34px'}
          lineHeight={'normal'}
          letterSpacing={'-0.02em'}
        />
        <div className={styles.balance}>
          <div className={styles.text}>Balance:</div>
          <div>{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
        </div>
      </div>
    </div>
  );
}
