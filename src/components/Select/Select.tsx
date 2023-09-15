import React, { ReactNode, useState } from 'react';
import styles from './select.module.scss';
import { InputField } from '../InputField';
import { ArrowIcon } from '../Icons';

interface ISelectProps {
  label?: string;
  name: string;
  value: string;
  isRequired?: boolean;
  children: ReactNode;
}

export function Select({ label, name, value, children, isRequired }: ISelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const handleFocus = () => {
    setIsSelectOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <InputField
        label={label}
        name={name}
        value={value}
        isRequired={isRequired}
        isReadOnly={true}
        onChange={() => {}}
        onFocus={handleFocus}
      />
      <div className={styles.arrow}>
        <ArrowIcon />
      </div>
      <div className={styles.content}>
        <div onClick={() => setIsSelectOpen(false)}>{isSelectOpen && children}</div>
      </div>
    </div>
  );
}
