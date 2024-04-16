import { FunctionComponent, useState, useEffect } from "react";
import { MenuProps } from "./menu.props";
import { Wrapper } from './menu.style';
import { PhUserBold } from '../../assets/PhUserBold';
import { PhHome } from '../../assets/PhHome';
import { Link, useLocation } from 'react-router-dom';

const Menu: FunctionComponent<MenuProps> = ({}) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <Wrapper>
      <div className="menuContainer">
        <Link to='/home' className={selectedItem === '/home' ? "itemSelected" : "item"}>
          <PhHome/>
          <p>Dashboard</p>
        </Link>

        <Link to='/profile' className={selectedItem === '/profile' ? "itemSelected" : "item"}>
          <PhUserBold/>
          <p>Users</p>
        </Link>
        <p className="appName"><span>C - Core</span></p> {/*Span for styling first letter*/}
        <p className="verName"><span>v 0.43.5</span></p>
      </div>
    </Wrapper>
  );
};

export default Menu;