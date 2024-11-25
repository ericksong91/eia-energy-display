import { lazy } from 'react'
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
];

function GraphParentContainer({ chartData, title, description }) {
    const chartTypes = ["line", "bar", "pie"];

    console.log(chartData)

    // const graphList = chartTypes.map((type) => {
    //     if (type === "line") {
    //         return <LineChart chartData={chartData} title={title} description={description} />
    //     } else if (type === "bar") {
    //         return <BarChart chartData={chartData} title={title} description={description} />
    //     } else if (type === "pie") {
    //         return <PieChart chartData={chartData} title={title} description={description} />
    //     } else {
    //         return <div>Empty Chart</div>
    //     }
    // });

    return (
        <section className='graphs container mx-auto'>
            {/* {graphList} */}
        </section>
    )
};

export default GraphParentContainer;