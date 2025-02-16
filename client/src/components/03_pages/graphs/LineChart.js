
import { Line } from 'react-chartjs-2';

function LineChart({ data, options }) {
    return (
        <div className='linechart p-0 sm:p-10'>
            <h3 className='chart-title-description text-center font-extrabold tracking-tight text-2xl sm:pb-2 sm:tracking-wide sm:text-3xl text-light-text dark:text-dark-text'>{data.description}</h3>
            <Line data={data} options={options} />
            <p className='units-period text-sm text-center hidden sm:block'>Year</p>
        </div>
    );
};

export default LineChart;