import React, { lazy } from 'react'
import GraphCard from './cards/GraphCard';
// import Chart from 'chart.js/auto'
// import { CategoryScale } from 'chart.js/auto';

// const PieChart = lazy(() => import("./graphs/PieChart"));
// const BarChart = lazy(() => import("./graphs/BarChart"));
// const LineChart = lazy(() => import("./graphs/LineChart"));

// Chart.register(CategoryScale);

// const styles = [
//     {
//       backgroundColor: [
//         "rgba(75,192,192,1)",
//         "#ecf0f1",
//         "#50AF95",
//         "#f3ba2f",
//         "#2a71d0"
//       ],
//       borderColor: "black",
//       borderWidth: 2
//     }
//   ]

function GraphParentContainer({ chartData }) {
    return (
        <section className='graphs'>
            <div className="container mx-auto px-3">
                <GraphCard chartData={chartData} />
            </div>
        </section>
    )
};

export default GraphParentContainer;