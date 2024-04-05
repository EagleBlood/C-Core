// Home.tsx
import React, { useState, FunctionComponent } from "react";
import { ThemeProvider } from 'styled-components';
import { HomeProps } from "./home.props";
import themes from '../../src/styles/themes';
import { Wrapper } from './home.style';
import Header from "../components/header/header";

const Home: FunctionComponent<HomeProps> = () => {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === themes.dark ? themes.light : themes.dark;
      return newTheme;
    });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header toggleTheme={toggleTheme}/>
        <div>
          <p>Home</p>
        </div>
       </Wrapper>
    </ThemeProvider>
  );
};

export default Home;