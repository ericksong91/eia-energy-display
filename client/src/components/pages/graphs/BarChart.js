import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ chartData }) {
    console.log(chartData)
    return (
        <div className='barchart chart-container'>
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Maryland Emissions from 1971 to 2021 in MMT"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default BarChart;