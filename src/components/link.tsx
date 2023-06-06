import React from 'react';
import NextLink from 'next/link';
import { Scope, css } from 'react-shadow-scope';

const stylesheet = css`
  .link {
    border-bottom: 0.1rem solid;
    color: var(--color-site-1-c);
    display: inline-block;
    text-decoration: none;
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
