
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { ChartJsData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataChartProps {
  chartData: ChartJsData;
}

const DataChart: React.FC<DataChartProps> = ({ chartData }) => {
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb', // gray-200
          font: {
            size: 14,
          }
        },
      },
      title: {
        display: false, // Title can be redundant if dataset label is clear
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)', // gray-800
        titleColor: '#f9fafb',
        bodyColor: '#e5e7eb',
        borderColor: '#4b5563', // gray-600
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af', // gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.5)', // gray-600 with alpha
        },
      },
      y: {
        ticks: {
          color: '#9ca3af', // gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.5)', // gray-600 with alpha
        },
      },
    },
  };

  const processDatasets = (datasets: ChartJsData['datasets']) => {
    const colors = [
        { bg: 'rgba(52, 211, 153, 0.2)', border: 'rgba(52, 211, 153, 1)' }, // emerald-400
        { bg: 'rgba(96, 165, 250, 0.2)', border: 'rgba(96, 165, 250, 1)' }, // blue-400
        { bg: 'rgba(251, 146, 60, 0.2)', border: 'rgba(251, 146, 60, 1)' }, // orange-400
    ];
    return datasets.map((ds, index) => ({
        ...ds,
        backgroundColor: colors[index % colors.length].bg,
        borderColor: colors[index % colors.length].border,
        borderWidth: 2,
        tension: 0.1, // for line charts
    }));
  };

  const data: ChartData = {
    labels: chartData.labels,
    datasets: processDatasets(chartData.datasets),
  };

  const chartComponent = () => {
    switch (chartData.type) {
      case 'line':
        return <Line options={options} data={data as ChartData<'line'>} />;
      case 'bar':
        return <Bar options={options} data={data as ChartData<'bar'>} />;
      default:
        console.warn(`Unsupported chart type: ${chartData.type}`);
        return null;
    }
  };

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg mt-4" style={{ position: 'relative', height: '300px' }}>
        {chartComponent()}
    </div>
  );
};

export default DataChart;
