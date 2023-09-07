'use client';

import React from 'react';
import { H1 } from '../components/Headings';
import { Button } from '../components/Button';
import { ButtonWithIcon } from '../components/ButtonWithIcon';
import { PlusIcon } from '../components/Icons';

export default function Page() {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <>
      <H1 text="Ваши счета" />
      <Button onClick={handleClick} text="Банкоматы" size={'small'} />
      <Button onClick={handleClick} text="Банкоматы" />
      <Button onClick={handleClick} text="Банкоматы" size={'medium'} />
      <ButtonWithIcon icon={<PlusIcon />} text="Добавить" onClick={handleClick} />
    </>
  );
}
