'use client';

import React, { ReactNode } from 'react';
import styles from './buttonWithIcon.module.scss';

interface IButtonWithIconProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export function ButtonWithIcon({ icon, text, onClick, isDisabled = false }: IButtonWithIconProps) {
  return (
    <button className={styles.button} onClick={onClick} disabled={isDisabled}>
      {icon}
      {text && <span>{text}</span>}
    </button>
  );
}
