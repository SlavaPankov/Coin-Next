import React from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  size?: 'small' | 'normal' | 'medium';
  isDisabled?: boolean;
}

export function Button({ text, onClick, isDisabled = false, size = 'normal' }: IButtonProps) {
  const className = classNames({
    [`${styles.button}`]: true,
    [`${styles.small}`]: size === 'small',
    [`${styles.normal}`]: size === 'normal',
    [`${styles.medium}`]: size === 'medium'
  });

  return (
    <button disabled={isDisabled} className={className} onClick={onClick}>
      {text}
    </button>
  );
}
