import React, { useState, FunctionComponent } from "react";

import { HomeProps } from "./home.props";
import themes from '../../src/styles/themes';
import { Wrapper } from './home.style';
import Header from "../components/header/header";
import Menu from "../components/menu/menu";

const Home: FunctionComponent<HomeProps> = () => {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === themes.dark ? themes.light : themes.dark;
      return newTheme;
    });
  };
  
  return (
    <Wrapper>
      <Header toggleTheme={toggleTheme}/>
      <div className="homeContainer">
        <Menu/>
        <p>Home</p>
      </div>
    </Wrapper>
  );
};

export default Home;