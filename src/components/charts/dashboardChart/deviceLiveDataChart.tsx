// src/components/charts/dashboard/DeviceLiveDataChart.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Device } from '../../../interfaces/DeviceContext';

interface DeviceDataChartProps {
  initialDeviceData: Device[];
  fetchDeviceData: () => Promise<Device[]>; // Function to fetch new device data
}

const DeviceLiveDataChart: React.FC<DeviceDataChartProps> = ({ initialDeviceData, fetchDeviceData }) => {
  const [deviceData, setDeviceData] = useState(initialDeviceData);

  useEffect(() => {
    // Fetch data once when the component mounts
    const fetchData = async () => {
      const newDeviceData = await fetchDeviceData();
      setDeviceData(prevDeviceData => {
        const updatedDeviceData = [...prevDeviceData, ...newDeviceData].slice(-60);
        return updatedDeviceData;
      });
    };
  
    fetchData();
  
    // Clear the data after a minute
    const timeoutId = setTimeout(() => {
      setDeviceData([]);
    }, 60000); // 60 seconds
  
    return () => clearTimeout(timeoutId); // Clean up on unmount
  }, [fetchDeviceData]);

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