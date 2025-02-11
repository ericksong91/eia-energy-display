import { useRef } from 'react';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import LineChart from "./LineChart";

Chart.register(CategoryScale);

function GraphCard({ data }) {
    const isChecked = data.isChecked;
    // useRef to animate out

    // const animatedFadeOut = document.querySelector(".graphcard");
    // console.log(animatedFadeOut)
    // animatedFadeOut.addEventListener("animationend", (e) => console.log("Animation has ended", e.target.value));

    return (
        <div onChange={(e) => console.log("help")} className={`
        graphcard p-4 m-4 rounded-lg shadow
        bg-light-main sm:bg-white hover:bg-opacity-90 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
        ${isChecked ? `animate__fadeInLeft` : `animate__fadeOutRight`}
        `}>
            <LineChart data={data} />
        </div>
    );
};

export default GraphCard;