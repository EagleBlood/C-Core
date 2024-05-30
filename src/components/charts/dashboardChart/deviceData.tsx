// src/components/charts/dashboard/DeviceDataChart.tsx
import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Device } from '../../../interfaces/DeviceContext';
import { DefaultTheme, ThemeContext } from 'styled-components';

interface DeviceDataChartProps {
  deviceData: Device[];
}

const DeviceDataChart: React.FC<DeviceDataChartProps> = ({ deviceData }) => {
  const themeContext = useContext<DefaultTheme | undefined>(ThemeContext);
  
  const data = {
    labels: deviceData.map(device => new Date(device.readingDate || '').toLocaleString()),
    datasets: [
      {
        label: 'Temperature',
        data: deviceData.map(device => device.temperature),
        fill: false,
        borderColor: themeContext?.colors.bg.bgSpecial,
        backgroundColor: themeContext?.colors.chart.chartY0,
        transition: themeContext?.values.time.slow,
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 7,
      },
      {
        label: 'Humidity',
        data: deviceData.map(device => device.humidity),
        fill: false,
        borderColor: themeContext?.colors.bg.bgSecondary,
        transition: themeContext?.values.time.slow,
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 7,
        
      },
    ],
  };

  const options = {
    animation: {
      onComplete: () => {},
      onProgress: () => {},
    } ,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,

    scales: {
      x: {
        grid: {
          color: themeContext?.colors.chart.grids,
        },
        ticks: {
          color: themeContext?.colors.text.textPrimary,
          font: {
            size: themeContext?.values.size.items.textSizeSmall,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: themeContext?.colors.chart.grids,
        },
        ticks: {
          color: themeContext?.colors.text.textPrimary,
          font: {
            size: themeContext?.values.size.items.textSizeSmall,
          },
        },

      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          color: themeContext?.colors.chart.grids,
        },
      },
    },
  };

  return <Line data={data} options={options}/>;
};

export default DeviceDataChart;