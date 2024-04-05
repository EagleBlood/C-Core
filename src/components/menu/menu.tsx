import React, { FunctionComponent, useState } from "react";
import { MenuProps } from "./menu.props";
import { Wrapper } from './menu.style';
import { PhUserBold } from '../../assets/PhUserBold';
import { PhHome } from '../../assets/PhHome';

const Menu: FunctionComponent<MenuProps> = ({}) => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <Wrapper>
      <div className="menuContainer">
        <div className={selectedItem === 'Dashboard' ? "itemSelected" : "item"}
          onClick={() => setSelectedItem('Dashboard')}
        >
          <PhHome/>
          <p>Dashboard</p>
        </div>

        <div className={selectedItem === 'Users' ? "itemSelected" : "item"}
          onClick={() => setSelectedItem('Users')}
        >
          <PhUserBold/>
          <p>Users</p>
        </div>
        <p className="appName"><span>C - Core</span></p> {/*Span for styling first letter*/}
        <p className="verName">v 0.43.5</p>
      </div>
    </Wrapper>
  );
};

export default Menu;