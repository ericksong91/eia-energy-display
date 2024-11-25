import { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
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
];

const PieChart = lazy(() => import("./graphs/PieChart"));
const BarChart = lazy(() => import("./graphs/BarChart"));
const LineChart = lazy(() => import("./graphs/LineChart"));

Chart.register(CategoryScale);

function GraphCard({ chartData, type, title, description }) {

    return (
        <div className='graphcard'>
            {
                type === "line"
                    ? <LineChart chartData={chartData} title={title} description={description} />
                    : type === "pie"
                        ? <PieChart chartData={chartData} title={title} description={description} />
                        : <BarChart chartData={chartData} title={title} description={description} />
            }
        </div>
    )
};

export default GraphCard;