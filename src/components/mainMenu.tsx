import React from 'react';
import { Scope, css } from 'react-shadow-scope';
import Icon from './icon';

const stylesheet = css`
  :host {
    position: relative;
  }
  nav {
    background-color: var(--color-site-1);
    box-shadow: rgba(0, 0, 0, 0.5) 1rem 0 3rem;
    display: grid;
    gap: 1rem;
    grid-auto-rows: min-content;
    height: 100vh;
    left: 0;
    max-width: 50rem;
    min-width: 20rem;
    overflow: auto;
    position: absolute;
    transition: left 0.3s, box-shadow 0.3s;
    width: 75vw;
    z-index: 100;
  }
  [aria-hidden=true] {
    box-shadow: none;
    left: -100%;
  }
  header {
    background-color: var(--color-brand-2);
    color: var(--color-brand-1);
    place-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
  h1 {
    font-family: var(--font-display);
    font-weight: normal;
    margin: 0;
  }
  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    transition: color 0.3s;
  }
  button:hover {
    color: var(--color-accent-1);
  }
`;

export type MainMenuProps = React.PropsWithChildren & {
  openState: [unknown, (open: boolean) => void],
};

const MainMenu = ({ children, openState, ...props }: MainMenuProps) => {

  const [open, setOpen] = openState;
  const closeMenu = () => { setOpen(false); };

  return (
    <Scope stylesheet={stylesheet} slottedContent={children}>
      <nav {...props} aria-hidden={open ? 'false' : 'true'}>
        <header>
          <h1>Tekko</h1>
          <button onClick={closeMenu}>
            <Icon type="close" />
          </button>
        </header>
        <slot></slot>
      </nav>
    </Scope>
  );
};

export default MainMenu;
