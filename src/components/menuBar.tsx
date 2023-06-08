import React, { useState } from 'react';
import { Scope, css } from 'react-shadow-scope';
import Icon from './icon';
import Image from 'next/image';
import Link from './link';
import MainMenu from './mainMenu';
import MainMenuItem from './mainMenuItem';

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
  .menuToggler {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
`;

export type MenuBarProps = {};

const MenuBar = (props: MenuBarProps) => {

  const openState = useState(false);
  const setOpen = openState[1];

  const openMenu = () => {
    setOpen(true);
  };

  return (
    <Scope stylesheet={stylesheet}>
      <div {...props} className="menuBar">
        <button className="menuToggler" onClick={openMenu}>
          <Icon type="menu" />
        </button>
        <Image alt="Tekko" width="100" height="75" src="/logos/full-logo-w-bg.png" className="logo" />
        <Link href="/registration">Register Now!</Link>
      </div>
      <MainMenu openState={openState}>
        <MainMenuItem href="/">Home</MainMenuItem>
        <MainMenuItem href="/registration">Register</MainMenuItem>
      </MainMenu>
    </Scope>
  );
};

export default MenuBar;
