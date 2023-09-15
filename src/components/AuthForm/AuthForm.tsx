import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { H1 } from '../Headings';
import styles from './authForm.module.scss';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import { ERoutes } from '../../types/enums/ERoutes';
import { useAppStore } from '../../store/store';
import { isFormValid } from '../../utils/isFormValid';
import { IFormData } from '../../types/interfaces/IFormData';

enum EFormFieldsName {
  login = 'login',
  password = 'password'
}

export function AuthForm() {
  const router = useRouter();
  const {
    tokenState: { loading, error },
    auth
  } = useAppStore((state) => state);
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [globalError, setGlobalError] = useState<string>('');

  useEffect(() => {
    setGlobalError(error);
  }, [error]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({});
    setGlobalError('');

    if (event.target.value.length < 6) {
      setFormError({
        ...formError,
        [event.target.name]: 'Minimal length is 6 characters'
      });
    }

    if (/\s/gi.test(event.target.value)) {
      setFormError({
        ...formError,
        [event.target.name]: 'Spaces are not allowed'
      });
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormError({
        ...formError,
        [event.currentTarget.name]: 'Required field'
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid(ref, formError)) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(data.entries()) as { [k: string]: string };

    try {
      const { error } = await auth(dataObject);

      if (!error) {
        router.push(ERoutes.accounts);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <form ref={ref} className={styles.form} onSubmit={handleSubmit}>
      <H1 text="Login" marginBottom="35px" />
      <InputField
        placeholder={'Login'}
        label={'Login'}
        value={formData[EFormFieldsName.login] || ''}
        error={formError[EFormFieldsName.login] || ''}
        name={EFormFieldsName.login}
        onChange={handleChange}
        onBlur={handleBlur}
        isRequired={true}
      />
      <InputField
        placeholder={'Password'}
        label={'Password'}
        value={formData[EFormFieldsName.password] || ''}
        error={formError[EFormFieldsName.password] || ''}
        name={EFormFieldsName.password}
        onChange={handleChange}
        onBlur={handleBlur}
        isRequired={true}
        type={'password'}
      />
      {globalError && <div className={styles.error}>{globalError}</div>}
      <div className={styles.buttonWrapper}>
        <Button text={'Enter'} isDisabled={loading} />
      </div>
    </form>
  );
}
