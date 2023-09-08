import React from 'react';
import '../../styles/globals.scss';
import { Header } from '../components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="page">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Coin</title>
      </head>
      <body className="page__body">
        <Header />
        {children}
      </body>
    </html>
  );
}
