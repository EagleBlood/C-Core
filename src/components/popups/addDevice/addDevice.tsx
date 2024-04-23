import { FunctionComponent, useState } from "react";
import { AddDeviceProps } from "./addDevice.props";
import { Wrapper } from './addDevice.style';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddDevice: FunctionComponent<AddDeviceProps> = ({ addDeviceToDashboard }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const navigate = useNavigate();

  const handleAddDevice = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (addDeviceToDashboard) {
      addDeviceToDashboard(deviceName, deviceType, deviceId);
    }
    navigate('/home');
  };

  return (
    <Wrapper>
      <motion.div 
        className="popupContainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
            from: 0.5,
            to: 1,
          },
        }}
      >
        <h1>Add Device</h1>

        <form id="addDeviceForm" className="formContainer" onSubmit={handleAddDevice}>
          <div className="inputItemContainer">
            <p>Device Name</p>
            <div className="inputField">
              <input type="text" placeholder="Enter device name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)}/>
            </div>
          </div>

          <div className="inputItemContainer">
            <p>Device Type</p>
            <div className="inputField">
              <input type="text" placeholder="Enter device type" value={deviceType} onChange={(e) => setDeviceType(e.target.value)}/>
            </div>
          </div>

          <div className="inputItemContainer">
            <p>Device ID</p>
            <div className="inputField">
              <input type="text" placeholder="Enter device ID" value={deviceId} onChange={(e) => setDeviceId(e.target.value)}/>
            </div>
          </div>
        </form>

        <button type="submit" form="addDeviceForm">Add Device</button>
      </motion.div>
    </Wrapper>
  );
};

export default AddDevice;