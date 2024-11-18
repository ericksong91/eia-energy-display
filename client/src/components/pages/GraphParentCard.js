import React, { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';

const PieChart = lazy(() => import("../graphs/PieChart"));
const BarChart = lazy(() => import("../graphs/BarChart"));
const LineChart = lazy(() => import("../graphs/LineChart"));

Chart.register(CategoryScale);

function GraphPage() {
    return (
        <section className='graphs'>
            <div className="container mx-auto px-3">
                <BarChart chartData={chartData} />
                <LineChart chartData={chartData} />
                <PieChart chartData={chartData} />
            </div>
        </section>
    )
}

export default GraphPage