import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import LineChart from "./LineChart";
import 'animate.css';

Chart.register(CategoryScale);

function GraphCard({ data }) {
    const isChecked = data.isChecked;
    console.log(data)

    // useRef to animate out

    // const animatedFadeOut = document.querySelector(".graphcard");
    // console.log(animatedFadeOut)
    // animatedFadeOut.addEventListener("animationend", (e) => console.log("Animation has ended", e.target.value));

    return (
        <div className={`
            graphcard
            animate__animated
            ${isChecked ? "animate__fadeInLeft" : "animate__fadeOutRight"}
            p-4 m-4 rounded-lg shadow 
            bg-light-main 
            sm:bg-white hover:bg-opacity-90 
            dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
            `}>
            <LineChart data={data} />
        </div>
    );
};

export default GraphCard;