import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import LineChart from "./LineChart";

Chart.register(CategoryScale);

function GraphCard({ data, options }) {

    return (
        <div className={`graphcard`}>
            <LineChart data={data} options={options}/>
        </div>
    );
};

export default GraphCard;