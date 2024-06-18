import { FunctionComponent, memo } from "react";

import { HomeProps } from "./home.props";
import { Wrapper } from './home.style';
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import AddDevice from "../../components/popups/addDevice/AddDevice";
import { motion } from "framer-motion";
import ManageUser from "../../components/popups/manageUser/ManageUser";

const Home: FunctionComponent<HomeProps> = ({ toggleTheme }) => { 
  const matchAddDevice = useMatch("/home/addDevice");
  const showAddDevicePopup = !!matchAddDevice;
  const location = useLocation();
  let key = location.pathname;

  if (location.pathname === '/home/addDevice') {
    key = '/home';
  }

  if (/^\/profile\/([a-zA-Z0-9]+)$/.test(location.pathname)) {
    key = '/profile';
  }

  // Determine if the ManageUser component should be shown
  const showManageUserPopup = /^\/profile\/([a-zA-Z0-9]+)$/.test(location.pathname);
  
  return (
    <Wrapper>
      <motion.div
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{duration: 1.5}}
      >
        <Header toggleTheme={toggleTheme}/>
        <div className="homeContainer">
          <div className="homeElementContainer">
            <Menu/>
              <motion.div
                className="outletContainer"
                key={key}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.5 }}
              >
                <Outlet />
              </motion.div>
          </div>

          {showAddDevicePopup && 
              <AddDevice/>
          }

          {showManageUserPopup && 
              <ManageUser/>
          }
      
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default memo(Home);