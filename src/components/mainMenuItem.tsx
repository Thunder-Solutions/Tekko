import React from 'react';
import { Scope, css } from 'react-shadow-scope';
import Link from './link';

const stylesheet = css`
  .mainMenuItem {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
  }
`;

export type MainMenuItemProps = React.PropsWithChildren & {
  href: string,
};

const MainMenuItem = ({ children, href, ...props }: MainMenuItemProps) => {

  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <div className="mainMenuItem">
        <Link {...props} href={href}>
          <slot></slot>
        </Link>
      </div>
    </Scope>
  );
};

export default MainMenuItem;
