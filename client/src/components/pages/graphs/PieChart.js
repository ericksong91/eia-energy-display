import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ chartData, title, description }) {
    return (
        <div className='graph-card block'>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>

                <div className='piechart'>
                    <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
                    <Pie
                        data={chartData}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Maryland Emissions from 1971 to 2021 in MMT"
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PieChart;