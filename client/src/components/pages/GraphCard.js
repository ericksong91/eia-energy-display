import { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import PieChart from "./graphs/PieChart";
import BarChart from "./graphs/BarChart";
import LineChart from "./graphs/LineChart";

Chart.register(CategoryScale);

function GraphCard({ chartData, type, chartLabels }) {

    // Returns either a line graph, piechart or barchart using a nested ternary

    return (
        <div className='graphcard p-4 m-3 w-90'>
            {
                type === "line"
                    ? <LineChart chartData={chartData} chartLabels={chartLabels} />
                    : type === "pie"
                        ? <PieChart chartData={chartData} chartLabels={chartLabels} />
                        : <BarChart chartData={chartData} chartLabels={chartLabels} />
            }
        </div>
    );
};

export default GraphCard;