'use client';

import React from 'react';
import { Scope, css } from 'react-shadow-scope';
import PageHeader from './pageHeader';
import Heading from './heading';

const stylesheet = css`
.page {
  background-color: var(--color-site-1);
}
.heading1 {
  color: var(--color-brand-3);
  display: block;
}
.heading2 {
  font-weight: 500;
}
.heading1,
.heading2 {
  text-shadow: rgba(0, 0, 0, 0.4) 0px 0.4rem 0.35rem;
}
`;

export type PageProps = React.PropsWithChildren & {
  coverImg: string,
  heading1: string,
  heading2: string,
};

const Page = ({ children, coverImg, heading1, heading2 }: PageProps) => {
  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <PageHeader coverImg={coverImg}>
        <Heading>
          <span className="heading1">{heading1}</span>
          <span className="heading2">{heading2}</span>
        </Heading>
      </PageHeader>
      <main className="page">
        <slot></slot>
      </main>
    </Scope>
  );
};

export default Page;
