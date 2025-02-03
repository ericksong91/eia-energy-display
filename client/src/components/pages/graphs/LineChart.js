import { useContext } from 'react';
import { DarkModeContext } from '../../helpers/DarkModeContext';
import { Line } from 'react-chartjs-2';

function LineChart({ fuelData, fuelLabels }) {
    const { title, description, units } = fuelLabels;
    const { graphTextColor } = useContext(DarkModeContext);

    const scales = {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                color: graphTextColor,
            },
        },
        x: {
            title: {
                display: true,
                text: 'Period'
            },
            ticks: {
                color: graphTextColor
            },
        },
    }; // Can add another scale if needed using y1, y2, etc

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: description,
                color: graphTextColor
            },
        },
        scales: scales
    };

    return (
        <div className="block p-6" >
            {Object.keys(fuelData).length === 0 ?
                <></>
                :
                <div className='linechart'>
                    <h1 className='chart-title text-center font-bold text-2xl text-black dark:text-white'>{title}</h1>
                    <Line data={fuelData} options={options} />
                </div>
            }
        </div >
    );
};

export default LineChart;