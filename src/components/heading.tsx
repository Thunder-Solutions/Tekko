'use client';

import React from 'react';
import { Scope, useCSS } from 'react-shadow-scope';

export type HeadingProps = React.PropsWithChildren;

const Heading = ({ children }: HeadingProps) => {
  const css = useCSS();
  return (
    <Scope slottedContent={children} stylesheet={css`
      .heading {
        font-family: var(--font-display);
        font-weight: normal;
        font-size: 6rem;
        margin: 0;
      }
    `}>
      <h1 className="heading">
        <slot></slot>
      </h1>
    </Scope>
  );
};

export default Heading;
