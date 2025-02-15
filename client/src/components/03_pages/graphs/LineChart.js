
import { Line } from 'react-chartjs-2';

function LineChart({ data, options }) {
    return (
        <div className='linechart p-0 sm:px-4'>
            <h2 className='chart-title-description text-center font-extrabold tracking-tight text-2xl sm:tracking-wide sm:pb-2 sm:text-3xl text-light-text dark:text-dark-text'>{data.description}</h2>
            <Line data={data} options={options} />
            <h3 className='units-period text-sm text-center hidden sm:block'>Year</h3>
        </div>
    );
};

export default LineChart;