import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './transferForm.module.scss';
import { InputField } from '../../InputField';
import { ButtonWithIcon } from '../../ButtonWithIcon';
import { MailIcon } from '../../Icons';
import { useAppStore } from '../../../store/store';
import { isFormValid } from '../../../utils/isFormValid';
import { getGlobalError } from '../../../utils/getGlobalError';
import { IFormData } from '../../../types/interfaces/IFormData';

enum EFormFieldsNames {
  from = 'from',
  to = 'to',
  amount = 'amount'
}

interface ITransferFormProps {
  account: string;
}

export function TransferForm({ account }: ITransferFormProps) {
  const {
    transferFounds,
    token,
    accountState: { error }
  } = useAppStore();
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [globalError, setGlobalError] = useState<string>('');
  const [isTransferInProcess, setIsTransferInProcess] = useState<boolean>(false);

  useEffect(() => {
    if (!account) {
      return;
    }

    setFormData({
      ...formData,
      [EFormFieldsNames.from]: account
    });
  }, [account]);

  useEffect(() => {
    if (!error) {
      return;
    }

    setGlobalError(error);
  }, [error]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({
      ...formError,
      [event.target.name]: ''
    });
    setGlobalError('');

    if (event.target.name === EFormFieldsNames.amount) {
      if (Number(event.target.value) < 0) {
        setFormError({
          ...formError,
          [event.target.name]: 'Amount must be more than Zero'
        });
      }
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
    setIsTransferInProcess(true);

    if (!isFormValid(ref, formError)) {
      const { tempError, globalError } = getGlobalError(ref);

      setFormError({
        ...formError,
        ...tempError
      });

      setGlobalError(globalError);
      setIsTransferInProcess(false);
      return;
    }

    const dataObject = Object.fromEntries(new FormData(event.currentTarget).entries());

    transferFounds(
      {
        from: (dataObject.from as string) || '',
        to: (dataObject.to as string) || '',
        amount: (dataObject.amount as string) || ''
      },
      token
    ).then(() => {
      setFormData({});
      setIsTransferInProcess(false);
    });
  };

  return (
    <form ref={ref} className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>New transfer</h3>
      <div className={'visually-hidden'}>
        <InputField
          type={'hidden'}
          value={formData[EFormFieldsNames.from] || ''}
          name={EFormFieldsNames.from}
          onChange={handleChange}
        />
      </div>
      <InputField
        type={'number'}
        placeholder={"Recipient's account number"}
        label={"Recipient's account number"}
        value={formData[EFormFieldsNames.to] || ''}
        error={formError[EFormFieldsNames.to] || ''}
        name={EFormFieldsNames.to}
        onChange={handleChange}
        onBlur={handleBlur}
        isRequired={true}
      />
      <InputField
        type={'number'}
        label={'Transfer amount'}
        placeholder={'Transfer amount'}
        value={formData[EFormFieldsNames.amount] || ''}
        error={formError[EFormFieldsNames.amount] || ''}
        name={EFormFieldsNames.amount}
        onChange={handleChange}
        onBlur={handleBlur}
        isRequired={true}
      />
      {globalError && <div className={styles.error}>{globalError}</div>}
      <div className={styles.buttonWrapper}>
        <ButtonWithIcon
          icon={<MailIcon />}
          text={!isTransferInProcess ? 'Send' : ''}
          isDisabled={isTransferInProcess}
        />
      </div>
    </form>
  );
}
