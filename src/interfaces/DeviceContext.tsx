import { createContext } from "react";
import { Device } from "./device";

export interface DeviceContextProps {
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

export const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);