import { FunctionComponent, memo, useState } from "react";

import { HomeProps } from "./home.props";
import { Wrapper } from './home.style';
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import AddDevice from "../../components/popups/addDevice/AddDevice";
import { Device, DeviceContext } from "../../interfaces/DeviceContext";
import { motion } from "framer-motion";

const Home: FunctionComponent<HomeProps> = ({ toggleTheme }) => { 
  const match = useMatch("/home/addDevice");
  const showPopup = !!match;
  const location = useLocation();
  let key = location.pathname;

  // To not play animation on add device popup route
  if (location.pathname === '/home/addDevice') {
    key = '/home';
  }
  
  const [devices, setDevices] = useState<Device[]>([]);
  const addDeviceToDashboard = (deviceName: string, deviceType: string, deviceId: string) => {
    setDevices(prevDevices => [...prevDevices, { deviceName, deviceType, deviceId }]);
  };
  
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

            <DeviceContext.Provider value={{ devices, setDevices }}>
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
            </DeviceContext.Provider>
          </div>

          {showPopup && 
              <AddDevice addDeviceToDashboard = {addDeviceToDashboard}/>
          }
      
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default memo(Home);