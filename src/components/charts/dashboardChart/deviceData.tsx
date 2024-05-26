// src/components/charts/dashboard/DeviceDataChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Device } from '../../../interfaces/DeviceContext';

interface DeviceDataChartProps {
  deviceData: Device[];
}

const DeviceDataChart: React.FC<DeviceDataChartProps> = ({ deviceData }) => {
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

export default DeviceDataChart;