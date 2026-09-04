'use client';

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const T = {
  gold: '#C0851A',
  emerald: '#109C6B',
  violet: '#6D5BD0',
  gray200: '#E6E1D8',
  gray100: '#F3F0E9',
};

const WEEK_DATES = [
  '2026-05-20',
  '2026-05-21',
  '2026-05-22',
  '2026-05-23',
  '2026-05-24',
  '2026-05-25',
  '2026-05-26',
];

export function WeekChart() {
  return (
    <Line
      data={{
        labels: WEEK_DATES,
        datasets: [
          {
            label: 'Sales',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: T.gold,
            backgroundColor: 'rgba(192,133,26,.12)',
            tension: 0.35,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: T.gold,
            borderWidth: 2,
          },
          {
            label: 'Purchases',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: T.emerald,
            backgroundColor: 'rgba(16,156,107,.10)',
            tension: 0.35,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: T.emerald,
            borderWidth: 2,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'center',
            labels: { usePointStyle: true, pointStyle: 'rectRounded', boxWidth: 14, padding: 18, font: { weight: 600 } },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 1,
            ticks: { callback: (v) => '$ ' + v, stepSize: 0.1 },
            title: { display: true, text: 'Amount', font: { weight: 600 } },
            grid: { color: T.gray100 },
          },
          x: { grid: { color: T.gray100 } },
        },
      }}
    />
  );
}

export function TopProductsChart() {
  return (
    <Doughnut
      data={{ labels: ['No data'], datasets: [{ data: [1], backgroundColor: [T.gray200], borderWidth: 0 }] }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      }}
    />
  );
}

export function CustomersChart() {
  return (
    <Pie
      data={{
        labels: ['direct-customer'],
        datasets: [{ data: [100], backgroundColor: [T.violet], borderColor: '#fff', borderWidth: 3 }],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: { usePointStyle: true, pointStyle: 'rectRounded', boxWidth: 14, padding: 10, font: { weight: 600 } },
          },
        },
      }}
    />
  );
}
