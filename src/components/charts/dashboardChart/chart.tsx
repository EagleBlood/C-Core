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


const DashboardChart = () => {
  const themeContext = useContext<DefaultTheme | undefined>(ThemeContext);

  const data = {
    labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40], 
        borderColor: themeContext?.colors.bg.bgSecondary,
        backgroundColor: themeContext?.colors.bg.bgSecondary,
        transition: themeContext?.values.time.slow,
        yAxisID: 'y',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: themeContext?.colors.bg.bgSpecial,
        backgroundColor: themeContext?.colors.bg.bgSpecial,
        yAxisID: 'y1',
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DashboardChart;

