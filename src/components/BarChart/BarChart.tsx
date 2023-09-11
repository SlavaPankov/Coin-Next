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
import styles from './barChart.module.scss';

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
}

export function BarChart({ data, options }: IBarChartProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Dynamics of balance</h3>
      <Bar
        width={'515px'}
        height={'165px'}
        options={{ ...defaultOptions, ...options }}
        data={data}
      />
    </div>
  );
}
