import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ chartData }) {
    return (
        <div className='chart-container'>
            <h2 style={{ textAlign: "center" }}>Line Graph</h2>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Maryland Emissions from 1971 to 2021"
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