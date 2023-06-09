import React from 'react';
import NextLink from 'next/link';
import { Scope, useCSS } from 'react-shadow-scope';

export type LinkProps = React.PropsWithChildren & {
  className?: string,
  href: string,
};

const Link = ({ children, className = '', href, ...props }: LinkProps) => {
  const css = useCSS();
  const LinkComponent = href.startsWith('#') ? 'a' : NextLink;

  return (
    <Scope slottedContent={children} className={className} stylesheet={css`
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
    `}>
      <LinkComponent {...props} href={href} className="link">
        <slot></slot>
      </LinkComponent>
    </Scope>
  );
};

export default Link;
