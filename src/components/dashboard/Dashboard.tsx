
import { IcSensor } from "../../assets/IcSensor";
import { PhPlugs } from "../../assets/PhPlugs";
import { PhPlugsConnected } from "../../assets/PhPlugsConnected";
import { PhPlus } from "../../assets/PhPlus";
import { PhUserBoldSec } from "../../assets/PhUserBoldSec";
import DashboardChart from "../charts/dashboardChart/chart";
import { DashboardProps } from "./dashboard.props";
import { Wrapper } from './dashboard.style';
import { FunctionComponent, useContext, useState } from "react";
import 'chart.js/auto';
import { useNavigate } from "react-router-dom";
import { Device, DeviceContext } from "../../interfaces/DeviceContext";

const Dashboard: FunctionComponent<DashboardProps> = ({}) => {
    const navigate = useNavigate();
    const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
    const context = useContext(DeviceContext);

    if (!context) {
        throw new Error('DeviceContext is undefined');
    }

  


    const addDevice = () => {
        navigate('/home/addDevice');
    };

    const { devices } = context;

    return (
        <Wrapper>
            <div className="scrollContainer">
                <div className="deviceInfoContainer">
                    <div className="deviceInfo">
                        <div className="row" style={{gap: '10px'}}>
                            <IcSensor/>
                            <p>Number of devices</p>
                        </div>
                        
                        <h1>5</h1>
                    </div>

                    <div className="verticleLine"></div>

                    <div className="deviceInfo">
                        <div className="row" style={{gap: '10px'}}>
                            <PhUserBoldSec/>
                            <p>Total Users</p>
                        </div>
                        <h1>5</h1>
                    </div>

                    <div className="verticleLine"></div>

                    <div className="deviceInfoSpecial">
                        <div className="row" style={{gap: '10px'}}>
                            <PhPlugsConnected/>
                            <p>Devices Active</p>
                        </div>
                        <h1>5</h1>
                    </div>

                    <div className="verticleLine"></div>

                    <div className="deviceInfo">
                        <div className="row" style={{gap: '10px'}}>
                            <PhPlugs/>
                            <p>Devices Inactive</p>
                        </div>
                        <h1>5</h1>
                    </div>
                </div>

                <div className="chartContainer">
                    <DashboardChart/>
                </div>

                <div className="deviceListContainer">
                    {devices
                        .map((device: Device, index: number) => ({ device, index }))
                        .sort((a, b) => (a.index === selectedDevice ? -1 : b.index === selectedDevice ? 1 : 0))
                        .map(({ device, index }) => (
                            <div 
                            key={index} 
                            className={`device ${selectedDevice === index ? 'selected' : ''}`}
                            onClick={() => setSelectedDevice(index)}
                            >
                            <h1>{device.deviceName}</h1>
                            <p>{device.deviceType}</p>
                            <p>{device.deviceId}</p>
                            </div>
                        ))}
                    <div className="addDevice" onClick={addDevice}>
                        <PhPlus/>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Dashboard;