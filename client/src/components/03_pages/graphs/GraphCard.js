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
        <div className={`graphcard m-4 rounded-lg`}>
            {<LineChart data={data} />}
        </div>
    );
};

export default GraphCard;