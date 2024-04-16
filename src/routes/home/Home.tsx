import { FunctionComponent } from "react";

import { HomeProps } from "./home.props";
import { Wrapper } from './home.style';
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import { Outlet } from "react-router-dom";

const Home: FunctionComponent<HomeProps> = ({ toggleTheme }) => { 
  return (
    <Wrapper>
      <Header toggleTheme={toggleTheme}/>
      <div className="homeContainer">
        <Menu/>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Home;