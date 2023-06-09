import React from 'react';
import { Scope, useCSS } from 'react-shadow-scope';

export type ParagraphProps = React.PropsWithChildren & {
  className?: string,
};

const Paragraph = ({ children, ...props }: ParagraphProps) => {
  const css = useCSS();

  return (
    <Scope slottedContent={children} stylesheet={css`
      p {
        margin: 0 auto;
        max-width: 40rem;
        padding: 1rem 2rem;
        text-align: center;
      }
    `}>
      <p {...props}>
        <slot></slot>
      </p>
    </Scope>
  );
};

export default Paragraph;
