import { useContext } from 'react';
import { DarkModeContext } from '../../00_context/DarkModeContext';
import { Line } from 'react-chartjs-2';

function LineChart({ data }) {
    const { description } = data;
    const { graphTextColor } = useContext(DarkModeContext);

    const units = data.datasets.map((d) => d.units);

    const scales = {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: `${units.length > 1 ? `${units[0]}, ${units[1]}` : units}`,
            },
            ticks: {
                color: graphTextColor,
            },
        },
        x: {
            ticks: {
                color: graphTextColor
            },
        },
    }; // Can add another scale if needed; using y1, y2, etc

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: true,
        },
        stacked: true,
        scales: scales
    };

    return (
        <div className='linechart p-0 sm:px-4 pt-4'>
            <h2 className='chart-title-description text-center font-extrabold tracking-wide text-lg sm:pb-2 sm:text-2xl text-black dark:text-white'>{description}</h2>
            <Line data={data} options={options} />
            <h3 className='units-period text-sm text-center hidden sm:block'>Year</h3>
        </div>
    );
};

export default LineChart;