import { FunctionComponent, useState, useEffect } from "react";
import { MenuProps } from "./menu.props";
import { Wrapper } from './menu.style';
import { PhUserBold } from '../../assets/PhUserBold';
import { PhHome } from '../../assets/PhHome';
import { Link, useLocation } from 'react-router-dom';
import { Tree } from "../tree/Tree";

const Menu: FunctionComponent<MenuProps> = ({}) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <Wrapper>
      <div className="menuContainer">
        <Tree
          name="Dashboard"
          defaultOpen
          icon={<PhHome/>}
          className={expandedItem === '/home' ? "itemSelected" : "item"}
          onClick={() => setExpandedItem('/home')}
          isOpen={expandedItem === '/home'}
        >

<Tree name="main" defaultOpen>
        <Tree name="hello" />
        <Tree name="subtree with children">
          <Tree name="hello" />
          <Tree name="sub-subtree with children">
            <Tree name="child 1" style={{ color: '#37ceff' }} />
            <Tree name="child 2" style={{ color: '#37ceff' }} />
            <Tree name="child 3" style={{ color: '#37ceff' }} />
            <Tree name="custom content">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  padding: 10,
                }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'black',
                    borderRadius: 5,
                  }}
                />
              </div>
            </Tree>
          </Tree>
          <Tree name="hello" />
        </Tree>
        <Tree name="world" />
        <Tree name={<span>🙀 something something</span>} />
      </Tree>
          

        </Tree>

        <Link to='/profile' className={selectedItem === '/profile' ? "itemSelected" : "item"} onClick={() => {
          setExpandedItem(null);
          setSelectedItem('/profile');
        }}>
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