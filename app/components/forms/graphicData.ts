import { useState } from 'react';
import { graphicData,Department } from '@/types';

export interface DepartXCountAnswer {
    department:Department;
    count:number;
}
export const useGraphicData = (): [graphicData, React.Dispatch<React.SetStateAction<graphicData>>] => {
    const [barData, setBarData] = useState<graphicData>({
        labels: [],
        datasets: [
            {
                label: 'Nota de las secciones',
                backgroundColor: 'rgba(58, 29, 99,0.6)',
                borderColor: '#3a1d63',
                borderWidth: 0.5,
                hoverBackgroundColor: 'rgba(58, 29, 99, 0.4)',
                hoverBorderColor: '#fff',
                pointBackgroundColor: 'white',
                pointBorderColor: 'white',
                pointHoverBackgroundColor: 'white',
                pointHoverBorderColor: 'white',
                borderDash: [],
                data: [],
            },
        ],
    });

    return [barData, setBarData];
};
import { ChartData } from 'chart.js';

export const useGraphicDataPie = (): [ChartData<'pie'>, React.Dispatch<React.SetStateAction<ChartData<'pie'>>>] => {
    const [pieData, setPieData] = useState<ChartData<'pie'>>({
        labels: [],
        datasets: [
            {
                label: 'Datos del gráfico de Pie',
                data: [],
                borderColor: '#4D4E51',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(58, 29, 99, 0.4)',
                backgroundColor: ['rgba(27, 38, 49, 0.5)',   // Azul transparente
                'rgba(125, 102, 8, 0.7)',  // Verde transparente
                'rgba(110, 44, 0, 0.7)',  // Verde oliva transparente
                'rgba(20, 90, 50, 0.7)',  // Marrón transparente
                'rgba(21, 67, 96, 0.7)',  // Marrón rojizo transparente
                'rgba(44, 62, 80, 0.7)',  ]
            },
        ],

    });

    return [pieData, setPieData];
};
