import React from 'react';
import { Content } from '../../../../components/Content';
import { DetailPageContent } from '../../../../components/DetailPageContent';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Content>
      <DetailPageContent id={params.id} />
    </Content>
  );
}
