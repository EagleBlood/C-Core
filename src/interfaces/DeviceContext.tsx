import { createContext } from "react";

export type Device = {
    deviceName: string;
    deviceType: string;
    deviceId: string;
  };

export interface DeviceContextProps {
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

export const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);