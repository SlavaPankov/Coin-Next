import React from 'react';
import { Content } from '../../components/Content';
import { AuthPageContent } from '../../components/AuthPageContent';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ERoutes } from '../../types/enums/ERoutes';

export default function Page() {
  if (cookies().has('token')) {
    redirect(ERoutes.accounts);
  }

  return (
    <Content>
      <AuthPageContent />
    </Content>
  );
}
