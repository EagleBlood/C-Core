// src/components/charts/dashboard/DeviceDataChart.tsx
import React, { ForwardedRef, ReactNode, forwardRef, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Device } from '../../../interfaces/DeviceContext';
import { DefaultTheme, ThemeContext } from 'styled-components';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

interface DeviceDataChartProps {
  deviceData: Device[];
}

const DeviceDataChart = forwardRef((props: DeviceDataChartProps, ref: ForwardedRef<any>): ReactNode => {
  const { deviceData } = props;

  Chart.register(zoomPlugin);

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
    maintainAspectRatio: false,
    animation: {
      onComplete: () => {},
      onProgress: () => {},
    } ,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,

    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy' as 'xy' | 'xy', // Allow panning in x direction only
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: false, // Disable drag to zoom
          },
          pinch: {
            enabled: true,
          },
          mode: 'x' as 'x', // Allow zooming in x direction only
          gestures: {
            pinch: 'xy', // Allow pinch to zoom in both x and y directions
            wheel: 'x' // Allow wheel to zoom in x direction only
          }
        }
      }
    },

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
});

export default DeviceDataChart;