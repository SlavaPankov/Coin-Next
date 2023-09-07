import React, { ChangeEvent, useState } from 'react';
import styles from './inputField.module.scss';
import classNames from 'classnames';

interface IInputFiledProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  type?: string;
  isDisabled?: boolean;
  onBlur?: () => void;
  error?: string;
  label?: string;
}

export function InputField({
  value,
  name,
  onChange,
  onBlur = () => {},
  placeholder = '',
  type = 'text',
  isDisabled = false,
  error = '',
  label = ''
}: IInputFiledProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleInput = () => {
    setIsTyping(true);
  };

  const inputClassName = classNames({
    [`${styles.input}`]: true,
    [`${styles.isTyping}`]: isTyping,
    [`${styles.isError}`]: error
  });

  return (
    <label htmlFor="" className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <input
        onInput={handleInput}
        className={inputClassName}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
        onBlur={() => {
          setIsTyping(false);
          onBlur();
        }}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
