import React, { useState } from 'react';
import { Scope, useCSS } from 'react-shadow-scope';
import Icon from './icon';
import Image from 'next/image';
import Link from './link';
import MainMenu from './mainMenu';
import MainMenuItem from './mainMenuItem';

export type MenuBarProps = {};

const MenuBar = (props: MenuBarProps) => {
  const css = useCSS();
  const openState = useState(false);
  const setOpen = openState[1];
  const openMenu = () => { setOpen(true); };

  return (
    <Scope stylesheet={css`
      .menuBar {
        place-items: center;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
        gap: 1rem;
        padding: 0.5rem 1rem;
      }
      .menuToggler {
        justify-self: flex-start;
      }
      .register {
        display: block;
        padding-right: 0.5rem;
        justify-self: flex-end;
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
    `}>
      <div {...props} className="menuBar">
        <button className="menuToggler" onClick={openMenu}>
          <Icon type="menu" />
        </button>
        <Image alt="Tekko" width="100" height="75" src="/logos/full-logo-w-bg.png" className="logo" />
        <Link href="/registration" className="register">Register Now!</Link>
      </div>
      <MainMenu openState={openState}>
        <MainMenuItem href="/">Home</MainMenuItem>
        <MainMenuItem href="/registration">Register</MainMenuItem>
      </MainMenu>
    </Scope>
  );
};

export default MenuBar;
