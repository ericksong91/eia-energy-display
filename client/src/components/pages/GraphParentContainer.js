import React from 'react'
import GraphCard from './child/GraphCard';
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
        <section className='graphs container flex-auto mx-auto'>
            <GraphCard chartData={chartData} />
        </section>
    )
};

export default GraphParentContainer;