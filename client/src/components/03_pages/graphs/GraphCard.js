import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import 'animate.css';

Chart.register(CategoryScale);

function GraphCard({ fuelData, fuelLabels, isChecked }) {
    const type = "line"; // Keep to line temporarily
    const tempCard = (<div className={`
        graphcard
        animate__animated
        ${isChecked ? "animate__fadeInLeft" : "animate__fadeOutRight"}
        p-4 m-4 rounded-lg shadow 
        bg-light-main 
        sm:bg-white hover:bg-opacity-90 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
        `}>
        {type === "line"
            ? <LineChart fuelData={fuelData} fuelLabels={fuelLabels} />
            :
            type === "pie"
                ? <PieChart fuelData={fuelData} fuelLabels={fuelLabels} />
                : <BarChart fuelData={fuelData} fuelLabels={fuelLabels} />
        }
    </div>)
    const [changeCardNull, setChangeCardNull] = useState(tempCard);

    // useEffect(() => {
    //     if(!isChecked) {
    //         return (<div><h1>div</h1></div>)
    //     }

    // }, [isChecked])



    return (
        <>
            {tempCard}
        </>
    );
};

export default GraphCard;