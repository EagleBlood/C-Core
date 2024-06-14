import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Device } from "../../interfaces/DeviceContext";
import DeviceDataChart from "../charts/dashboardChart/deviceData";
import { Wrapper } from './menuElement.style';
import { MenuElementProps } from "./menuElement.props";

const MenuElement: FunctionComponent<MenuElementProps> = ({ name }) => {
  const location = useLocation();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const chartRef = useRef<{ chartInstance: { canvas: HTMLCanvasElement } } | null>(null);
  const [isChartActive, setIsChartActive] = useState(false);

  useEffect(() => {
    // Fetch devices and set the selected device based on the URL
    fetch('http://localhost:3100/api/data/all')
      .then(response => response.json())
      .then((data: Device[]) => {
        const currentLocation = location.pathname.split('/').pop();
        const devicesForCurrentLocation = data.filter(d => d.location === currentLocation);
        if (devicesForCurrentLocation.length > 0) {
          setDevices(devicesForCurrentLocation); // Set all devices for the current location
        } else {
          setDevices([]); // Fallback to setting all devices if none match the location
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

  useEffect(() => {
    if (chartRef.current) {
      const chartCanvas = chartRef.current.chartInstance.canvas;
  
      chartCanvas.addEventListener('mousedown', () => setIsChartActive(true));
      chartCanvas.addEventListener('mouseup', () => setIsChartActive(false));
      chartCanvas.addEventListener('mouseleave', () => setIsChartActive(false));
  
      return () => {
        chartCanvas.removeEventListener('mousedown', () => setIsChartActive(true));
        chartCanvas.removeEventListener('mouseup', () => setIsChartActive(false));
        chartCanvas.removeEventListener('mouseleave', () => setIsChartActive(false));
      };
    }
  }, []);

  return (
    <Wrapper>
      <div className="scrollContainer">
        <div className="center">
          <h1>{name}</h1>
        </div>

        {devices.length > 0 && (
          <div className="deviceListContainer">
          {devices
            .sort((a, b) => (a.deviceId === selectedDevice?.deviceId ? -1 : b.deviceId === selectedDevice?.deviceId ? 1 : 0))
            .map((device) => (
              <div
                key={device.deviceId}
                className={`device ${selectedDevice?.deviceId === device.deviceId ? 'selected' : ''}`}
                onClick={() => setSelectedDevice(device)}
              >
                <h1>Device {device.deviceId}</h1>
                {selectedDevice?.deviceId === device.deviceId && (
                  <div className="selectedDeviceInfo">
                    <br/>
                    <h2>Recent Data</h2>
                    <div className="selectedRecentData">
                      {...deviceData
                        .sort((a, b) => new Date(b.readingDate || 0).getTime() - new Date(a.readingDate || 0).getTime())
                        .slice(0, 8)
                        .map((data, index) => (
                          <div className="col" key={index}>
                            <p>Temperature: {data.temperature}</p>
                            <p>Pressure: {data.pressure}</p>
                            <p>Humidity: {data.humidity}</p>
                            <p>Reading Date: {data.readingDate ? new Date(data.readingDate).toLocaleDateString() : 'N/A'}</p>
                            <p>Reading Time: {data.readingDate ? new Date(data.readingDate).toLocaleTimeString() : 'N/A'}</p>
                          </div>
                        ))}
                    </div>
                    <div className="chartElement">
                      {/* Render chart for the selected device */}
                      <DeviceDataChart deviceData={deviceData} ref={chartRef} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default MenuElement;