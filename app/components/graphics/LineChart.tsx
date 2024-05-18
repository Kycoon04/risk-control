import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart,registerables  } from "chart.js";
Chart.register(...registerables);

interface LineProps {
    data: ChartData<'line'>;
}
const barOptions: ChartOptions<'line'> = {
    indexAxis: 'y',
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };
export default function Linechart({ data}: LineProps) {
    return <Line height="50px" width="50px" data={data} options={barOptions} />;
}