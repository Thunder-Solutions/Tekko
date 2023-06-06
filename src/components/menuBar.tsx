import React from 'react';
import { Scope, css } from 'react-shadow-scope';
import Icon from './icon';
import Image from 'next/image';
import Link from './link';

const stylesheet = css`
  .menuBar {
    place-items: center;
    justify-content: space-between;
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1rem;
  }
  .logo {
    object-fit: contain;
  }
`;

export type MenuBarProps = {};

const MenuBar = (props: MenuBarProps) => {

  return (
    <Scope stylesheet={stylesheet}>
      <div {...props} className="menuBar">
        <Icon type="menu" />
        <Image alt="Tekko" width="100" height="75" src="/logos/full-logo-w-bg.png" className="logo" />
        <Link href="/registration">Register Now!</Link>
      </div>
    </Scope>
  );
};

export default MenuBar;
