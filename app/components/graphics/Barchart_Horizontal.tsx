import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart,registerables  } from "chart.js";
Chart.register(...registerables);

interface LineProps {
    data: ChartData<'bar'>;
}
const barOptions: ChartOptions<'bar'> = {
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
export default function Barchart({ data}: LineProps) {
    return <Bar height="50px" width="50px" data={data} options={barOptions} />;
}