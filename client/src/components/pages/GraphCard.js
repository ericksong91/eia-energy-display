import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import PieChart from "./graphs/PieChart";
import BarChart from "./graphs/BarChart";
import LineChart from "./graphs/LineChart";

Chart.register(CategoryScale);

function GraphCard({ fuelData, fuelLabels }) {
    // Returns either a line graph, piechart or barchart using a nested ternary
    const type = "line"; // Keep to line temporarily

    return (
        <div className='graphcard p-4 m-4 rounded-lg shadow bg-sea-seco hover:bg-opacity-90 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 fade-in-left'>
            {
                type === "line"
                    ? <LineChart fuelData={fuelData} fuelLabels={fuelLabels} />
                    : type === "pie"
                        ? <PieChart fuelData={fuelData} fuelLabels={fuelLabels} />
                        : <BarChart fuelData={fuelData} fuelLabels={fuelLabels} />
            }
        </div>
    );
};

export default GraphCard;