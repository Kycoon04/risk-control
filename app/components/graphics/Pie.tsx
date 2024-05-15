import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface PieProps {
    data: ChartData<'pie'>;
}

const pieOptions: ChartOptions<'pie'> = {
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: true,
        },
    },
};

const Piechart = ({ data }: PieProps) => {
    return <Pie data={data} options={pieOptions} />;
};

export default Piechart;