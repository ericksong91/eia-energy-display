import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ chartData }) {
    return (
        <div className='linechart chart-container'>
            <h2 style={{ textAlign: "center" }}>Line Graph</h2>
            <Line
                data={chartData}
                options={
                    {
                        scales: {
                            y: {
                                ticks: {
                                    callback: function(value, index, ticks){
                                        return 'MMT' + ' ' + value
                                    }
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: "Maryland Emissions from 1971 to 2021 in MMT"
                            },
                            legend: {
                                display: true
                            }
                        }
                    }}
            />
        </div>
    )
}

export default LineChart;