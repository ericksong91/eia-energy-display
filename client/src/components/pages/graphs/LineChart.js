import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ chartData, chartLabels }) {
    const { title, description, units } = chartLabels;
    const scales = {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        x: {
            title: {
                display: true,
                text: 'Period'
            }
        }
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
                text: description
            }
        },
        scales: scales
    };

    return (
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
            {Object.keys(chartData).length === 0 ?
                <></>
                :
                <div className='linechart'>
                    <h1 className='chart-title text-center font-bold text-2xl dark:text-white'>{title}</h1>
                    <Line data={chartData} options={options} />
                </div>
            }
        </div >
    );
};

export default LineChart;