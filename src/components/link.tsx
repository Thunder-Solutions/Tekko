import React from 'react';
import NextLink from 'next/link';
import { Scope, css } from 'react-shadow-scope';

const stylesheet = css`
  .link {
    border-bottom: 0.1rem solid;
    color: var(--color-accent-1-c);
    display: inline-block;
    padding-bottom: 0;
    text-decoration: none;
    transition: color 0.3s, padding 0.3s, border 0.3s;
  }
  .link:hover {
    border-bottom-width: 0.3rem;
    color: var(--color-accent-1);
    padding-bottom: 0.3rem;
  }
`;

export type LinkProps = React.PropsWithChildren & {
  href: string,
};

const Link = ({ children, href, ...props }: LinkProps) => {

  const LinkComponent = href.startsWith('#') ? 'a' : NextLink;

  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <LinkComponent {...props} href={href} className="link">
        <slot></slot>
      </LinkComponent>
    </Scope>
  );
};

export default Link;
