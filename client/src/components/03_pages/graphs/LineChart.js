import { useContext } from 'react';
import { DarkModeContext } from '../../00_context/DarkModeContext';
import { Line } from 'react-chartjs-2';

function LineChart({ data }) {
    const { title, description } = data;
    const { graphTextColor } = useContext(DarkModeContext);

    console.log(data)

    const scales = {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,

            },
            ticks: {
                color: graphTextColor,
            },
        },
        x: {
            title: {
                display: true,
                text: 'Period'
            },
            ticks: {
                color: graphTextColor
            },
        },
    }; // Can add another scale if needed; using y1, y2, etc

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: true,
        },
        stacked: true,
        scales: scales
    };

    return (
        <div className="p-6" >
            {Object.keys(data).length === 0 ?
                <></>
                :
                <div className='linechart'>
                    <h1 className='chart-title text-center font-bold text-2xl text-black dark:text-white'>{title} {description}</h1>
                    <Line data={data} options={options} />
                </div>
            }
        </div >
    );
};

export default LineChart;