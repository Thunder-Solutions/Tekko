'use client';

import React from 'react';
import { Scope, css } from 'react-shadow-scope';
import PageHeader from './pageHeader';
import Heading from './heading';

const stylesheet = css`
.page {
  background-color: var(--color-site-1);
}
`;

export type PageProps = React.PropsWithChildren & {
  coverImg: string,
  heading: string,
};

const Page = ({ children, coverImg, heading }: PageProps) => {
  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <PageHeader coverImg={coverImg}>
        <Heading>{heading}</Heading>
      </PageHeader>
      <main className="page">
        <slot></slot>
      </main>
    </Scope>
  );
};

export default Page;
