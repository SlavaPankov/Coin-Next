'use client';
import React from 'react';
import styles from './authPageContent.module.scss';
import { AuthForm } from '../AuthForm';

export function AuthPageContent() {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
}
