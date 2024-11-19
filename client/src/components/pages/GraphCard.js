import React, { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';

const LineChart = lazy(() => import("./graphs/LineChart"));

Chart.register(CategoryScale);

function GraphCard({ chartData }) {
    return (
        <div className='graph-card checking'>
            <LineChart chartData={chartData} />
        </div>
    )
}

export default GraphCard