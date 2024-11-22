import React, { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';

const PieChart = lazy(() => import("./graphs/PieChart"));
const BarChart = lazy(() => import("./graphs/BarChart"));
const LineChart = lazy(() => import("./graphs/LineChart"));

Chart.register(CategoryScale);

const styles = [
    {
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
      ],
      borderColor: "black",
      borderWidth: 2
    }
  ]

function GraphCard({ chartData, chartType }) {
    if(chartType === "line") return <div className='graph-card'><LineChart chartData={chartData}/></div>;
    if(chartType === "pie") return <div className='graph-card'><PieChart chartData={chartData}/></div>;
    if(chartType === "bar") return <div className='graph-card'><BarChart chartData={chartData}/></div>;

    return (
        <div className='graph-card'>no chart</div>
    )
};

export default GraphCard