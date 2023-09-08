import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ERoutes } from '../../types/enums/ERoutes';
import { Content } from '../../components/Content';
import { AccountsPageContent } from '../../components/AccountsPageContent';

export default function Page() {
  if (!cookies().has('token')) {
    redirect(ERoutes.login);
  }

  return (
    <Content>
      <AccountsPageContent />
    </Content>
  );
}
