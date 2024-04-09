import React, { useState, FunctionComponent } from "react";

import { HomeProps } from "./home.props";
import { Wrapper } from './home.style';
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";

const Home: FunctionComponent<HomeProps> = ({ toggleTheme }) => { 
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