'use client';

import React from 'react';
import { Scope, css } from 'react-shadow-scope';

const stylesheet = css`
.pageHeader {
  background-size: cover;
  background-position: center;
  background-color: var(--color-site-1);
  display: grid;
  grid-template-rows: auto 1fr;
  height: 40rem;
  position: relative;
}
.pageHeader::after {
  background-image: linear-gradient(transparent, var(--color-site-1));
  content: '';
  display: block;
  height: 20rem;
  pointer-events: none;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.content {
  display: grid;
  align-items: flex-end;
  text-align: center;
  position: relative;
  z-index: 1;
}
`;

export type PageHeaderProps = React.PropsWithChildren & {
  coverImg: string,
};

const PageHeader = ({ children, coverImg }: PageHeaderProps) => {
  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <header className="pageHeader" style={{ backgroundImage: `url(${coverImg})` }}>
        <menu>menu</menu>
        <div className="content">
          <slot></slot>
        </div>
      </header>
    </Scope>
  );
};

export default PageHeader;
