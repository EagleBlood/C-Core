import React, { FunctionComponent } from "react";
import { HeaderProps } from "./header.props.ts";
import { Wrapper } from './header.style.ts';
import { Logo } from '../../assets/Logo.tsx';
import { ThemeIcon } from "../../assets/ThemeIcon.tsx";
import { Link } from "react-router-dom";

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme }) => {
  return (
    <Wrapper>
      <div className="bar">
        <Logo/>
        <h1 className="username">User1</h1>
        <button onClick={toggleTheme}><ThemeIcon /></button>
        <Link to='/acc/login'><button><h2>Logout</h2></button></Link>
      </div>
    </Wrapper>
  );
};

export default Header;
