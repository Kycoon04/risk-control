import { Radar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart,registerables  } from "chart.js";

Chart.register(...registerables);

interface LineProps {
    data: ChartData<'radar'>;
}
const radarOptions: ChartOptions<'radar'> = {
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        r: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
                backdropColor: 'transparent',
            },
        },
    },
};
export default function Radarchart({ data}: LineProps) {
    return <Radar height="50px" width="50px" data={data} options={radarOptions} />;
}