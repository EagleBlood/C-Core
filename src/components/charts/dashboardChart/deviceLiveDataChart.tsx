// src/components/charts/dashboard/DeviceLiveDataChart.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Device } from '../../../interfaces/DeviceContext';

interface DeviceDataChartProps {
  websocket: WebSocket;
  deviceId: number;
}

const DeviceLiveDataChart: React.FC<DeviceDataChartProps> = ({ websocket, deviceId }) => {
  const [deviceData, setDeviceData] = useState<Device[]>([]);

  useEffect(() => {
    websocket.onmessage = (event) => {
      const newDeviceData: Device = JSON.parse(event.data);
      // Only update the state if the data is for the selected device
      if (newDeviceData.deviceId === deviceId) {
        setDeviceData(prevDeviceData => {
          const updatedDeviceData = [...prevDeviceData, newDeviceData].slice(-60);
          return updatedDeviceData;
        });
      }
    };
  
    return () => { websocket.onmessage = null; }; // Clean up on unmount
  }, [websocket, deviceId]); // Add deviceId to the dependency array

  const data = {
    labels: deviceData.map(device => new Date(device.readingDate || '').toLocaleString()),
    datasets: [
      {
        label: 'Temperature',
        data: deviceData.map(device => device.temperature),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Humidity',
        data: deviceData.map(device => device.humidity),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  return <Line data={data} />;
};

export default DeviceLiveDataChart;