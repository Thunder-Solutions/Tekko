'use client';

import React from 'react';
import { Scope, css } from 'react-shadow-scope';

const stylesheet = css`
.heading {
  font-family: var(--font-display);
  font-weight: normal;
  font-size: 6rem;
  margin: 0;
}
`;

export type HeadingProps = React.PropsWithChildren;

const Heading = ({ children }: HeadingProps) => {
  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <h1 className="heading">
        <slot></slot>
      </h1>
    </Scope>
  );
};

export default Heading;
