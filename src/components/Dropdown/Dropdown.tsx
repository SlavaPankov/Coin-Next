import React, { ReactNode, useEffect, KeyboardEvent, useState } from 'react';
import styles from './dropdown.module.scss';
import { ArrowIcon } from '../Icons';
import classNames from 'classnames';

interface IDropdownProps {
  children: ReactNode;
  button: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({
  children,
  button,
  isOpen = false,
  onOpen = NOOP,
  onClose = NOOP
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code.toLowerCase().trim() === 'space') {
      handleOpen();
    }
  };

  useEffect(() => {
    setIsDropdownOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDropdownOpen, onClose, onOpen]);

  const arrowClassName = classNames({
    [`${styles.arrowWrapper}`]: true,
    [`${styles.open}`]: isDropdownOpen
  });

  return (
    <div className={styles.dropdown}>
      <div className={styles.button} onClick={handleOpen} onKeyDown={handleKeyDown}>
        {button}
        <div className={arrowClassName}>
          <ArrowIcon />
        </div>
      </div>
      <div className={styles.wrapper}>
        {isDropdownOpen && (
          <div onClick={() => setIsDropdownOpen(false)} onKeyDown={handleKeyDown}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
