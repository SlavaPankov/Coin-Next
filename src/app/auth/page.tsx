'use client';
import React from 'react';
import { Content } from '../../components/Content';
import { AuthForm } from '../../components/AuthForm';
import styles from './auth.module.scss';

export default function Page() {
  return (
    <Content>
      <div className={styles.container}>
        <AuthForm />
      </div>
    </Content>
  );
}
