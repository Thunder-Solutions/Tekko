import React from 'react';
import { Scope, css } from 'react-shadow-scope';

const stylesheet = css`
  p {
    margin: 0 auto;
    max-width: 40rem;
    padding: 1rem 2rem;
    text-align: center;
  }
`;

export type ParagraphProps = React.PropsWithChildren & {
  className?: string,
};

const Paragraph = ({ children, ...props }: ParagraphProps) => {

  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <p {...props}>
        <slot></slot>
      </p>
    </Scope>
  );
};

export default Paragraph;
