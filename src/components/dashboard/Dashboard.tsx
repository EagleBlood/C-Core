
import { IcSensor } from "../../assets/IcSensor";
import { PhPlugs } from "../../assets/PhPlugs";
import { PhPlugsConnected } from "../../assets/PhPlugsConnected";
import { PhPlus } from "../../assets/PhPlus";
import { PhUserBoldSec } from "../../assets/PhUserBoldSec";
import DashboardChart from "../charts/dashboardChart/chart";
import { DashboardProps } from "./dashboard.props";
import { Wrapper } from './dashboard.style';
import { FunctionComponent, useEffect, useRef, useState } from "react";
import 'chart.js/auto';
import { useNavigate } from "react-router-dom";
import { Device } from "../../interfaces/DeviceContext";
import DeviceDataChart from "../charts/dashboardChart/deviceData";
import DeviceLiveDataChart from "../charts/dashboardChart/deviceLiveDataChart";

// Define the type for a device

const Dashboard: FunctionComponent<DashboardProps> = ({}) => {
    const navigate = useNavigate();
    const [isToggled, setIsToggled] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
    const [devices, setDevices] = useState<Device[]>([]);
    const [deviceData, setDeviceData] = useState<Device[]>([]);
    const [userCount, setUserCount] = useState(0);
    const [activeDevicesPerDay, setActiveDevicesPerDay] = useState<Record<string, number>>({});
    const [inactiveDevicesPerDay, setInactiveDevicesPerDay] = useState<Record<string, number>>({});
    const today = new Date().toISOString().split('T')[0];
    const activeDevicesToday = activeDevicesPerDay[today] || 0;
    const [isChartActive, setIsChartActive] = useState(false);
    const chartRef = useRef<{ chartInstance: { canvas: HTMLCanvasElement } } | null>(null);

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
        if (selectedDevice !== null) {
            fetch(`http://localhost:3100/api/data/${selectedDevice}`)
                .then(response => response.json())
                .then(data => {
                    setDeviceData(data);
                });
        }
    }, [selectedDevice]);
    
    useEffect(() => {
        const localUserCount = localStorage.getItem('userCount');
        if (localUserCount) {
            setUserCount(JSON.parse(localUserCount));
        } else {
            fetch('http://localhost:3100/api/user/all')
                .then(response => response.json())
                .then(data => {
                    setUserCount(data.length);
                    localStorage.setItem('userCount', JSON.stringify(data.length));
                });
        }
    }, []);
    
    useEffect(() => {
        fetch('http://localhost:3100/api/data/all')
            .then(response => response.json())
            .then((data: any[]) => {
                setDevices(data);
    
                const twoWeeksAgo = Date.now() - 2 * 7 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
    
                // Create a map where the key is the deviceId and the value is the latest readingDate for that device
                const deviceLatestReadingDateMap = data.reduce((acc: Record<string, any>, curr: any) => {
                    if (!curr.readingDate) {
                        return acc;
                    }
    
                    const currentReadingDate = new Date(curr.readingDate).getTime();
                    if (!acc[curr.deviceId] || currentReadingDate > acc[curr.deviceId]) {
                        acc[curr.deviceId] = currentReadingDate;
                    }
    
                    return acc;
                }, {});
    
                // Create a map to store the count of active devices per day
                const activeDevicesPerDay: Record<string, number> = {};
    
                // Iterate over the map and check if the latest readingDate is later than two weeks ago
                Object.keys(deviceLatestReadingDateMap).forEach((deviceId: string) => {
                    const readingDate = deviceLatestReadingDateMap[deviceId];
                    if (readingDate > twoWeeksAgo) {
                        const date = new Date(readingDate).toISOString().split('T')[0]; // Get the date part of the timestamp
                        if (!activeDevicesPerDay[date]) {
                            activeDevicesPerDay[date] = 0;
                        }
                        activeDevicesPerDay[date]++;
                    }
                });
    
                setActiveDevicesPerDay(activeDevicesPerDay);
                console.log(activeDevicesPerDay); // This will log the count of active devices per day
            });
    }, []);

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
                <div className="deviceInfoContainer">
                    <div className="deviceInfo">
                        <div className="row">
                            <IcSensor/>
                            <p>Number of devices</p>
                        </div>
                        
                        <h1>{devices.length}</h1>
                    </div>

                    <div className="verticleLine"></div>

                    <div className="deviceInfo">
                        <div className="row">
                            <PhUserBoldSec/>
                            <p>Total Users</p>
                        </div>
                        <h1>{userCount}</h1>
                    </div>

                    <div className="verticleLine"></div>

                    <div className="deviceInfoSpecial">
                        <div className="row">
                            <PhPlugsConnected/>
                            <p>Devices Active</p>
                        </div>
                        <h1>{activeDevicesToday}</h1>
                    </div>

                    {/*<div className="verticleLine"></div>

                    <div className="deviceInfo">
                        <div className="row">
                            <PhPlugs/>
                            <p>Devices Inactive</p>
                        </div>
                        <h1>{devices.length}</h1>
                    </div>*/}
                </div>

                <div className="chartContainer">
                    <DashboardChart
                        totalDevices={devices.length}
                        activeDevicesPerDay={activeDevicesPerDay}
                        inactiveDevices={devices.length}
                    />
                </div>

                <div className="deviceListContainer">
                {devices
                    .sort((a, b) => (a.deviceId === selectedDevice ? -1 : b.deviceId === selectedDevice ? 1 : 0))
                    .map((device: Device) => (
                        <div 
                            key={device.deviceId} 
                            className={`device ${selectedDevice === device.deviceId ? 'selected' : ''}`}
                            onClick={() => setSelectedDevice(device.deviceId)}
                        >
                            <h1>Device {device.deviceId}</h1>
                            {selectedDevice === device.deviceId && 
                                <div className="selectedDeviceInfo">
                                    <br/>

                                    {/*<DeviceLiveDataChart websocket={websocket} deviceId={selectedDevice} />*/}

                                    <h2>Recent Data</h2>

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

                                    <div className="chartElement">
                                        <DeviceDataChart deviceData={deviceData} ref={chartRef}/>
                                    </div>
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