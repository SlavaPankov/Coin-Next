import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './stackedBarChart.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const defaultOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    }
  }
};

interface IBarChartProps {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
  width?: string;
  height?: string;
}

export function StackedBarChart({
  data,
  options,
  width = 'auto',
  height = 'auto'
}: IBarChartProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Ratio of incoming outgoing transactions</h3>
      <Bar width={width} height={height} options={{ ...defaultOptions, ...options }} data={data} />
    </div>
  );
}
