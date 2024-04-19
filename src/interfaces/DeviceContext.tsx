import React, { createContext, useContext, useState } from 'react';

export interface Device {
  deviceName: string;
  deviceType: string;
  deviceId: string;
}

interface DeviceContextProps {
  devices: Device[];
  addDeviceToDashboard: (deviceName: string, deviceType: string, deviceId: string) => void;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

interface DeviceProviderProps {
    children: React.ReactNode;
  }
  
  const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
    const [devices, setDevices] = useState<Device[]>([]);
  
    const addDeviceToDashboard = (deviceName: string, deviceType: string, deviceId: string) => {
      console.log('Adding device to dashboard:', deviceName, deviceType, deviceId);
      setDevices(prevDevices => [...prevDevices, { deviceName, deviceType, deviceId }]);
    };
  
    return (
      <DeviceContext.Provider value={{ devices, addDeviceToDashboard }}>
        {children}
      </DeviceContext.Provider>
    );
  };

export const useDevices = (): DeviceContextProps => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};

const [devices, setDevices] = useState<Device[]>([]);

const addDeviceToDashboard = (deviceName: string, deviceType: string, deviceId: string) => {
  console.log('Adding device to dashboard:', deviceName, deviceType, deviceId);
  setDevices(prevDevices => [...prevDevices, { deviceName, deviceType, deviceId }]);
};

export { DeviceContext, DeviceProvider };