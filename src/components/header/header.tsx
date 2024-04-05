import React, { useContext, FunctionComponent } from "react";
import { ThemeProvider } from 'styled-components';
import { HeaderProps } from "./header.props";
import theme from '../../styles/themes';
import { Wrapper } from './header.style';


const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <ThemeProvider theme={theme.dark}>
      <Wrapper>
          Demo Container content here!
       </Wrapper>
    </ThemeProvider>
  );
};

export default Header;
