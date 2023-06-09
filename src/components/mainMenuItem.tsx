import React from 'react';
import NextLink from 'next/link';
import { Scope, useCSS } from 'react-shadow-scope';

export type MainMenuItemProps = React.PropsWithChildren & {
  href: string,
};

const MainMenuItem = ({ children, href, ...props }: MainMenuItemProps) => {
  const css = useCSS();
  const LinkComponent = href.startsWith('#') ? 'a' : NextLink;

  return (
    <Scope slottedContent={children} stylesheet={css`
      .link {
        background-color: transparent;
        color: var(--color-site-1-c);
        display: block;
        padding: 1rem 4rem;
        font-family: var(--font-display);
        text-align: right;
        text-decoration: none;
        transition: background-color 0.3s, color 0.3s;
      }
      .link:hover {
        background-color: var(--color-accent-1);
        color: var(--color-accent-1-c);
      }
      @media (min-width: 31em) {
        .link {
          font-size: 3rem;
          padding: 2rem 8rem;
        }
      }
    `}>
      <LinkComponent {...props} href={href} className="link">
        <slot></slot>
      </LinkComponent>
    </Scope>
  );
};

export default MainMenuItem;
