'use client';

import React from 'react';
import { Scope, useCSS } from 'react-shadow-scope';
import MenuBar from './menuBar';

export type PageHeaderProps = React.PropsWithChildren & {
  coverImg: string,
};

const PageHeader = ({ children, coverImg }: PageHeaderProps) => {
  const css = useCSS();
  return (
    <Scope slottedContent={children} stylesheet={css`
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
        height: 15rem;
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
    `}>
      <header className="pageHeader" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${coverImg})` }}>
        <MenuBar />
        <div className="content">
          <slot></slot>
        </div>
      </header>
    </Scope>
  );
};

export default PageHeader;
