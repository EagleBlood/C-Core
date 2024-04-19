import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from './addDevice.style';
import React from "react";
import { useDevices } from "../../../interfaces/DeviceContext";
import { AddDeviceProps } from "./addDevice.props";

const AddDevice: FunctionComponent<AddDeviceProps> = React.memo(() => { 
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const navigate = useNavigate();
  const { addDeviceToDashboard } = useDevices();

  const handleAddDevice = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addDeviceToDashboard(deviceName, deviceType, deviceId);
    console.log('Submitting form with values:', deviceName, deviceType, deviceId);
    navigate('/home');
  };

  return (
    <Wrapper>
      <div className="popupContainer">
        <h1>Add Device</h1>
        <form onSubmit={handleAddDevice}>
          <div className="inputContainer">
            <label>Device Name</label>
            <input type="text" placeholder="Enter device name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)}/>
          </div>
          <div className="inputContainer">
            <label>Device Type</label>
            <input type="text" placeholder="Enter device type" value={deviceType} onChange={(e) => setDeviceType(e.target.value)}/>
          </div>
          <div className="inputContainer">
            <label>Device ID</label>
            <input type="text" placeholder="Enter device ID" value={deviceId} onChange={(e) => setDeviceId(e.target.value)}/>
          </div>
          <button type="submit">Add Device</button>
        </form>
      </div>
    </Wrapper>
  );
});

export default AddDevice;