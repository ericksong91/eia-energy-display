import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import LineChart from "./LineChart";
import TableChart from './TableChart';

Chart.register(CategoryScale);

function GraphCard({ data }) {

    return (
        <div className={`graphcard m-4 rounded-lg cursor-default bg-white`}>
            <LineChart data={data} />
            <TableChart data={data} />
        </div>
    );
};

export default GraphCard;