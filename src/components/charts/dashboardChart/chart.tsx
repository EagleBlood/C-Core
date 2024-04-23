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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const DashboardChart = React.memo(() => {
  const themeContext = useContext<DefaultTheme | undefined>(ThemeContext);
  const [chartKey, setChartKey] = useState(0); // Add this line

  useEffect(() => {
    setChartKey(prevKey => prevKey + 1); // Increment the key to force a re-render
  }, [themeContext]); // Re-run the effect when the theme changes

  const data = {
    labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40], 
        borderColor: themeContext?.colors.bg.bgSpecial,
        backgroundColor: themeContext?.colors.chart.chartY0,
        transition: themeContext?.values.time.slow,
        yAxisID: 'y',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: themeContext?.colors.bg.bgSecondary,
        pointHoverBorderColor: themeContext?.colors.bg.bgSpecial,
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: themeContext?.colors.bg.bgSecondary,
        backgroundColor: themeContext?.colors.chart.chartY1,
        transition: themeContext?.values.time.slow,
        yAxisID: 'y1',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: themeContext?.colors.bg.bgSpecial,
        pointHoverBorderColor: themeContext?.colors.bg.bgSecondary,
      },
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
        min: 0,
        grid: {

        },
        ticks: {
          color: themeContext?.colors.text.textPrimary,
          font: {
            size: themeContext?.values.size.items.textSizeSmall,
          },
        },

      },
      y1: {
        min: 0,
        type: 'linear' as const,
        display: false,
        position: 'right' as const,

        grid: {
          
        },
      },
    },
  };

  console.log('Rendering Line chart with data:', data, 'and options:', options);
  return <Line key={chartKey} data={data} options={options} />;
});

export default DashboardChart;

