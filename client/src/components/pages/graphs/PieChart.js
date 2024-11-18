import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ chartData }) {
    return (
        <div className='piechart chart-container'>
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
    )
}

export default PieChart;