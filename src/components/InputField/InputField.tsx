import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './inputField.module.scss';
import classNames from 'classnames';

interface IInputFiledProps {
  value: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  onFocus?: (event: FormEvent<HTMLInputElement>) => void;
}

export function InputField({
  value,
  name,
  onChange,
  onBlur = () => {},
  onFocus = () => {},
  placeholder = '',
  type = 'text',
  isDisabled = false,
  error = '',
  label = '',
  isRequired = false,
  isReadOnly = false
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
        data-required={isRequired}
        onInput={handleInput}
        className={inputClassName}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={isReadOnly}
        disabled={isDisabled}
        onBlur={(event: FormEvent<HTMLInputElement>) => {
          setIsTyping(false);
          onBlur(event);
        }}
        onFocus={onFocus}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
