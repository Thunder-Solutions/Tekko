import React from 'react';
import { Scope, css } from 'react-shadow-scope';
import {
  FaBars,
} from 'react-icons/fa';
import {
  AiOutlineCloseSquare,
} from 'react-icons/ai'

const stylesheet = css`
  .icon {
    align-items: center;
    display: flex;
    font-size: 4rem;
  }
`;

const iconTypes = {
  menu: FaBars,
  close: AiOutlineCloseSquare,
}

export type IconProps = {
  type: keyof typeof iconTypes,
};

const Icon = ({ type, ...props }: IconProps) => {
  
  const IconComponent = iconTypes[type];

  if (!IconComponent) return <span {...props}>(no icon)</span>;

  return (
    <Scope stylesheet={stylesheet}>
      <span className="icon" {...props}>
        <IconComponent />
      </span>
    </Scope>
  );
};

export default Icon;
