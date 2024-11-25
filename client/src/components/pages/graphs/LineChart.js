import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ chartData, title, description }) {

    return (
        <div className='graph-card block'>
            <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">{description}</p>

                <div className='linechart'>
                    <h2 style={{ textAlign: "center" }}>Line Graph</h2>
                    <Line
                        data={chartData}
                        options={
                            {
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: function (value, index, ticks) {
                                                return 'Units' + value
                                            }
                                        }
                                    }
                                },
                                plugins: {
                                    title: {
                                        display: true,
                                        text: { title }
                                    },
                                    legend: {
                                        display: true
                                    }
                                }
                            }}
                    />
                </div>

            </div>
        </div>

    )
}

export default LineChart;