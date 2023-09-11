import React from 'react';
import { Content } from '../../../components/Content';
import { AccountPageContent } from '../../../components/AccountPageContent';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Content>
      <AccountPageContent id={params.id} />
    </Content>
  );
}
