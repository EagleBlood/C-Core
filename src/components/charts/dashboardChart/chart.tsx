
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { DefaultTheme, ThemeContext } from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardChartProps {
  totalDevices: number;
  activeDevicesPerDay: Record<string, number>;
  inactiveDevices: number;
}

const generateLast14Days = () => {
  const result = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0]; // Format date as 'yyyy-mm-dd'
    result.push(dateString);
  }
  return result.reverse();
};

const DashboardChart: React.FC<DashboardChartProps> = ({ totalDevices, activeDevicesPerDay, inactiveDevices }) => {
  const themeContext = useContext<DefaultTheme | undefined>(ThemeContext);
  const [chartKey, setChartKey] = useState(0);

  const labels = generateLast14Days();

  const dataActive = labels.map(label => activeDevicesPerDay[label] || 0);
  const dataInactive = Array(14).fill(inactiveDevices);

  useEffect(() => {
    setChartKey(prevKey => prevKey + 1);
  }, [themeContext]);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Active Devices',
        data: dataActive,
        borderColor: themeContext?.colors.bg.bgSpecial,
        backgroundColor: themeContext?.colors.chart.chartY0,
        transition: themeContext?.values.time.slow,
        yAxisID: 'y',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      /*{
        label: 'Inactive Devices',
        data: dataInactive,
        borderColor: themeContext?.colors.bg.bgSecondary,
        transition: themeContext?.values.time.slow,
        yAxisID: 'y',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },*/
    ],
  };

  const options = {
    responsive: true,
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
      legend: {
        display: false,
      },
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
        max: totalDevices,
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
        max: totalDevices,
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          color: themeContext?.colors.chart.grids,
        },
      },
    },
  };
  

  return <Line key={chartKey} data={data} options={options} />;
};


export default DashboardChart;

