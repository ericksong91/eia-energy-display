import React, { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';

const PieChart = lazy(() => import("../components/graphs/PieChart"));
const BarChart = lazy(() => import("../components/graphs/BarChart"));
const LineChart = lazy(() => import("../components/graphs/LineChart"));

Chart.register(CategoryScale);

function Home({ chartData }) {
  return (
    <div className="Home">
      <BarChart chartData={chartData} />
      <LineChart chartData={chartData} />
      <PieChart chartData={chartData} />
    </div>
  )
}

export default Home