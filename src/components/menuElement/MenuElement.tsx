import { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Device } from "../../interfaces/DeviceContext";
import DeviceDataChart from "../charts/dashboardChart/deviceData";
import { Wrapper } from './menuElement.style';
import { MenuElementProps } from "./menuElement.props";

const MenuElement: FunctionComponent<MenuElementProps> = () => {
  const location = useLocation();
  const [selectedDevice, setSelectedDeviceState] = useState<Device | null>(null);
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Fetch devices and set the selected device based on the URL
    fetch('http://localhost:3100/api/data/all')
      .then(response => response.json())
      .then((data: Device[]) => {
        setDevices(data);
        const currentLocation = location.pathname.split('/').pop();
        const deviceForCurrentLocation = data.find(d => d.location === currentLocation);
        if (deviceForCurrentLocation) {
          setSelectedDeviceState(deviceForCurrentLocation);
        }
      });
  }, [location.pathname]);

  useEffect(() => {
    // Fetch device data for the selected device
    if (selectedDevice) {
      fetch(`http://localhost:3100/api/data/${selectedDevice.deviceId}`)
        .then(response => response.json())
        .then(data => {
          setDeviceData(data);
        });
    }
  }, [selectedDevice]);

  return (
    <Wrapper>
      <div className="deviceListContainer">
        {devices
          .sort((a, b) => (a.deviceId === selectedDevice?.deviceId ? -1 : b.deviceId === selectedDevice?.deviceId ? 1 : 0))
          .map((device: Device) => (
            <div 
              key={device.deviceId} 
              className={`device ${selectedDevice?.deviceId === device.deviceId ? 'selected' : ''}`}
              onClick={() => setSelectedDeviceState(device)}
            >
              <h1>Device {device.deviceId}</h1>
            </div>
          ))}
      </div>
      {selectedDevice && (
        <div className="selectedDevice">
          <h1>Device {selectedDevice.deviceId}</h1>
          <div className="selectedDeviceInfo">
            <h2>Recent Data</h2>
            <div className="selectedRecentData">
              {deviceData
                .sort((a, b) => new Date(b.readingDate || 0).getTime() - new Date(a.readingDate || 0).getTime())
                .slice(0, 8)
                .map((data, index) => (
                  <div className="col" key={index}>
                    <p>Temperature: {data.temperature}</p>
                    <p>Pressure: {data.pressure}</p>
                    <p>Humidity: {data.humidity}</p>
                    <p>Reading Date: {data.readingDate ? new Date(data.readingDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                ))}
            </div>
            <div className="chartElement">
              <DeviceDataChart deviceData={deviceData} />
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default MenuElement;