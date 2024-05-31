import { FunctionComponent, useState, useEffect } from "react";
import { MenuProps } from "./menu.props";
import { Wrapper } from './menu.style';
import { PhUserBold } from '../../assets/PhUserBold';
import { PhHome } from '../../assets/PhHome';
import { Link, useLocation } from 'react-router-dom';
import Accordion from "../tree/Accordion";

const Menu: FunctionComponent<MenuProps> = ({}) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    setSelectedItem(location.pathname);
    if (location.pathname === '/profile') {
      setIsAccordionExpanded(false);
      setUserInteracted(false);
    } else if (location.pathname === '/home' && !userInteracted) {
      setIsAccordionExpanded(true);
    }
  }, [location]);

  const handleAccordionToggle = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
    setUserInteracted(true);
  };

  return (
    <Wrapper>
      <div className="menuContainer">
        <Accordion
          controllerElement={() => (
            <Link to='/home' className={selectedItem.includes('/home') ? "itemSelected" : "item"}>
              <PhHome/>
              <p>Dashboard</p>
            </Link>
          )}
          isExpanded={isAccordionExpanded}
          setIsExpanded={handleAccordionToggle}
        >
          <ul>
            <Link to="/home/garage">
              <li className={location.pathname === "/home/garage" ? "selectedListItem" : ""}>Garage</li>
            </Link>
            <Link to="/home/bedroom">
              <li className={location.pathname === "/home/bedroom" ? "selectedListItem" : ""}>Bedroom</li>
            </Link>
            <Link to="/home/basement">
              <li className={location.pathname === "/home/basement" ? "selectedListItem" : ""}>Basement</li>
            </Link>
          </ul>
        </Accordion>

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