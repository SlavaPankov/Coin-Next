import React from 'react';
import '../../styles/globals.scss';
import localFont from 'next/font/local';

const workSans = localFont({
  src: [
    {
      path: '../../public/assets/fonts/worksans-light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/worksans-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/worksans-medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/worksans-semibold.woff2',
      weight: '600',
      style: 'normal'
    }
  ]
});

const Ubuntu = localFont({
  src: [
    {
      path: '../../public/assets/fonts/ubuntu-medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/ubuntu-regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ]
});

const Roboto = localFont({
  src: [
    {
      path: '../../public/assets/fonts/roboto-medium.woff2',
      weight: '500',
      style: 'normal'
    }
  ]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`page ${workSans.className} ${Roboto.className} ${Ubuntu.className}`}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Coin</title>
      </head>
      <body className="page__body">{children}</body>
    </html>
  );
}
