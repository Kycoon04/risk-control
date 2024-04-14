import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart,registerables  } from "chart.js";
Chart.register(...registerables);

interface LineProps {
    options: ChartOptions<'bar'>;
    data: ChartData<'bar'>;
}

export default function Barchart({ data, options }: LineProps) {
    return <Bar height="50px" width="50px" data={data} options={options} />;
}