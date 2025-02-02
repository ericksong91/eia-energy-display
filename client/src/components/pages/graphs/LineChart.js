import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ fuelData, fuelLabels }) {
    const { title, description, units } = fuelLabels;

    const colors = 'white';

    const scales = {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                color: colors,
            },
        },
        x: {
            title: {
                display: true,
                text: 'Period'
            },
            ticks: {
                color: colors
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
                color: colors
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
                    <h1 className='chart-title text-center font-bold text-2xl text-black sm:text-white dark:text-white'>{title}</h1>
                    <Line data={fuelData} options={options} />
                </div>
            }
        </div >
    );
};

export default LineChart;