import React, { ChangeEvent, useState } from 'react';
import { H1 } from '../Headings';
import styles from './authForm.module.scss';
import { InputField } from '../InputField';
import { Button } from '../Button';

interface IFormData {
  [k: string]: string;
}

enum EFormFieldsName {
  login = 'login',
  password = 'password'
}

export function AuthForm() {
  const [formData, setFormData] = useState<IFormData>({});
  const [formError] = useState<IFormData>({});
  const [globalError] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className={styles.form}>
      <H1 text="Login" marginBottom="35px" />
      <InputField
        value={formData[EFormFieldsName.login] || ''}
        onChange={handleChange}
        name={EFormFieldsName.login}
        placeholder={'Login'}
        label={'Login'}
        error={formError[EFormFieldsName.login] || ''}
      />
      <InputField
        value={formData[EFormFieldsName.password] || ''}
        onChange={handleChange}
        name={EFormFieldsName.password}
        placeholder={'Password'}
        label={'Password'}
        error={formError[EFormFieldsName.password] || ''}
      />
      {globalError && <div className={styles.error}>{globalError}</div>}
      <div className={styles.buttonWrapper}>
        <Button text={'Enter'} />
      </div>
    </form>
  );
}
