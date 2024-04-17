import { FunctionComponent, useState } from "react";

import { HomeProps } from "./home.props";
import { Wrapper } from './home.style';
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import { Outlet, useMatch } from "react-router-dom";
import AddDevice from "../../components/popups/addDevice/addDevice";
import { Device } from "../../interfaces/device";
import { DeviceContext } from "../../interfaces/DeviceContext";

const Home: FunctionComponent<HomeProps> = ({ toggleTheme }) => { 
  const match = useMatch("/home/addDevice");
  const showPopup = !!match;

  const [devices, setDevices] = useState<Device[]>([]);
  const addDeviceToDashboard = (deviceName: string, deviceType: string, deviceId: string) => {
    setDevices(prevDevices => [...prevDevices, { deviceName, deviceType, deviceId }]);
  };
  
  return (
    <Wrapper>
      <Header toggleTheme={toggleTheme}/>
      <div className="homeContainer">
        <Menu/>
        <DeviceContext.Provider value={{ devices, setDevices }}>
          <Outlet />
        </DeviceContext.Provider>
      </div>
      {showPopup && <AddDevice addDeviceToDashboard = {addDeviceToDashboard}/>}
    </Wrapper>
  );
};

export default Home;