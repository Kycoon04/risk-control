import { useState } from 'react';
import { graphicData } from '@/types';

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
