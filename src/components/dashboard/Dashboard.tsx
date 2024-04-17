
import { IcSensor } from "../../assets/IcSensor";
import { PhPlugs } from "../../assets/PhPlugs";
import { PhPlugsConnected } from "../../assets/PhPlugsConnected";
import { PhPlus } from "../../assets/PhPlus";
import { PhUserBoldSec } from "../../assets/PhUserBoldSec";
import DashboardChart from "../charts/dashboardChart/chart";
import { DashboardProps } from "./dashboard.props";
import { Wrapper } from './dashboard.style';
import { FunctionComponent, useState } from "react";
import 'chart.js/auto';

const Dashboard: FunctionComponent<DashboardProps> = ({}) => {
    const [devices, setDevices] = useState(['test']);
    const [selectedDevice, setSelectedDevice] = useState<number | null>(null);


    const addDevice = () => {
      setDevices([...devices, 'new device']);
    };

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
                    .map((device, index) => ({ device, index }))
                    .sort((a, b) => (a.index === selectedDevice ? -1 : b.index === selectedDevice ? 1 : 0))
                    .map(({ device, index }) => (
                    <div 
                        key={index} 
                        className={`device ${selectedDevice === index ? 'selected' : ''}`}
                        onClick={() => setSelectedDevice(index)}
                    >
                        <h1>{device}</h1>
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
