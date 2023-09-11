import { RefObject } from 'react';
import { IFormData } from '../types/interfaces/IFormData';

export function getGlobalError(ref: RefObject<HTMLFormElement>) {
  const tempError: IFormData = {};
  const requiredFields = ref.current?.querySelectorAll<HTMLInputElement>('[data-required="true"]');

  if (!requiredFields) {
    return {
      tempError: {},
      globalError: ''
    };
  }

  requiredFields.forEach((item) => {
    if (item.value === '') {
      tempError[item.name] = 'Required field';
    }
  });

  return {
    tempError,
    globalError: 'Fill in all required fields'
  };
}
