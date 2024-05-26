
import { IcSensor } from "../../assets/IcSensor";
import { PhPlugs } from "../../assets/PhPlugs";
import { PhPlugsConnected } from "../../assets/PhPlugsConnected";
import { PhPlus } from "../../assets/PhPlus";
import { PhUserBoldSec } from "../../assets/PhUserBoldSec";
import DashboardChart from "../charts/dashboardChart/chart";
import { DashboardProps } from "./dashboard.props";
import { Wrapper } from './dashboard.style';
import { FunctionComponent, useContext, useEffect, useState } from "react";
import 'chart.js/auto';
import { useNavigate } from "react-router-dom";
import { Device } from "../../interfaces/DeviceContext";
import { Chart } from "react-chartjs-2";
import DeviceDataChart from "../charts/dashboardChart/deviceData";
import DeviceLiveDataChart from "../charts/dashboardChart/deviceLiveDataChart";

// Define the type for a device

const Dashboard: FunctionComponent<DashboardProps> = ({}) => {
    const navigate = useNavigate();
    //const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
    //const context = useContext(DeviceContext);
    const [isToggled, setIsToggled] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
    const [devices, setDevices] = useState<Device[]>([]);
    const [deviceData, setDeviceData] = useState<Device[]>([]);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3100/');
        ws.onopen = () => {
          setWebsocket(ws);
        };
        return () => {
          ws.close();
        };
      }, []);

    const addDevice = () => {
        navigate('/home/addDevice');
        setIsToggled(true);
    };

    useEffect(() => {
        if (window.location.pathname !== '/home/addDevice') {
            setIsToggled(false);
        }
    }, [window.location.pathname]);

    useEffect(() => {
        fetch('http://localhost:3100/api/data/all')
          .then(response => response.json())
          .then(data => setDevices(data));
    }, []);

    useEffect(() => {
        // Ensure a device is selected before fetching
        if (selectedDevice !== null) {
          const deviceId = devices[selectedDevice].deviceId; // Use the actual device ID
      
          fetch(`http://localhost:3100/api/data/${deviceId}`)
            .then(response => response.json())
            .then(data => setDeviceData(data))
            .catch(error => console.error('Error:', error));
        }
    }, [selectedDevice, devices]); // Add devices as a dependency

    
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
                            <h1>Device {device.deviceId}</h1>
                            {selectedDevice === index && 
                                <div className="selectedDeviceInfo">
                                    <br/>

                                    {/*<div className="selectedLatestData">
                                        <div className="col">
                                            <p>Temperature: {device.temperature}</p>
                                            <p>Pressure: {device.pressure}</p>
                                            <p>Humidity: {device.humidity}</p>
                                            <p>Reading Date: {device.readingDate ? new Date(device.readingDate).toLocaleDateString() : 'N/A'}</p>
                                        </div>

                                        <DeviceLiveDataChart websocketUrl="ws://localhost:3100/" />
                                    </div>

                                    <div className="horizantalLine"></div>
                                    */}
                                    {websocket ? <DeviceLiveDataChart websocket={websocket} /> : 'Connecting...'}

                                    <h2>Reacent Data</h2>

                                    <div className="selectedRecentData">
                                        {[...deviceData]
                                            .sort((a, b) => new Date(b.readingDate || 0).getTime() - new Date(a.readingDate || 0).getTime())
                                            .slice(0, 8)
                                            .map((device, index) => (
                                                <div className="col" key={index}>
                                                    <p>Temperature: {device.temperature}</p>
                                                    <p>Pressure: {device.pressure}</p>
                                                    <p>Humidity: {device.humidity}</p>
                                                    <p>Reading Date: {device.readingDate ? new Date(device.readingDate).toLocaleDateString() : 'N/A'}</p>
                                                </div>
                                            ))}
                                    </div>

                                    <DeviceDataChart deviceData={deviceData} />

                                    
                                </div>
                            }
                        </div>
                        ))}
                    <div className="addDevice" onClick={addDevice} >
                        <PhPlus/>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Dashboard;