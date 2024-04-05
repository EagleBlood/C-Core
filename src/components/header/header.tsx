import React, { FunctionComponent } from "react";
import { HeaderProps } from "./header.props";
import { Wrapper } from './header.style';
import { Logo } from '../../assets/Logo.tsx';
import { ThemeIcon } from "../../assets/ThemeIcon.tsx";

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme }) => {
  return (
    <Wrapper>
      <div className="bar">
        <Logo/>
        <h1 className="username">User1</h1>
        <button onClick={toggleTheme}><ThemeIcon /></button>
        <button>Logout</button>
      </div>
    </Wrapper>
  );
};

export default Header;