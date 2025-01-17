import { lazy } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import PieChart from "./graphs/PieChart";
import BarChart from "./graphs/BarChart";
import LineChart from "./graphs/LineChart";

Chart.register(CategoryScale);

function GraphCard({ chartData, type, title, description }) {
    return (
        <div className='graphcard p-3 m-3 w-90'>
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