import { useContext, useRef } from 'react';
import { DarkModeContext } from '../../00_context/DarkModeContext';
import { Line } from 'react-chartjs-2';
import useWindowSize from '../../01_helpers/useWindowSize';

function LineChart({ data }) {
    const { description } = data;
    const { graphTextColor } = useContext(DarkModeContext);
    const units = data.datasets.map((d) => d.units);
    const windowSize = useWindowSize();
    const chartRef = useRef(null);

    function resizeLabelFontSize() {
        // sm	640px	
        // md	768px	
        // lg	1024px	
        // xl	1280px	
        // 2xl	1536px

        // Rework font size 
        // return font size in obj

        return { }
    }

    const scales = {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: `${units.length > 1 ? `${units[0]}, ${units[1]}` : units}`,
                color: graphTextColor,
            },
            ticks: {
                callback: function (value, index) {
                    return index % 2 === 0 ? this.getLabelForValue(value) : '';
                },
                color: graphTextColor,
            },
        },
        x: {
            ticks: {
                callback: function (value, index) {
                    return index % 2 === 0 ? this.getLabelForValue(value) : '';
                },
                color: graphTextColor,
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
        scales: scales,
        plugins: {
            legend: {
                labels: {
                    boxWidth: 20,
                    font: {
                        size: 15
                    },
                },
            },
        },
    };

    return (
        <div className='linechart p-0 sm:px-4 pt-4'>
            <h2 className='chart-title-description text-center font-extrabold tracking-tight text-2xl sm:tracking-wide sm:pb-2 sm:text-4xl text-light-text dark:text-dark-text'>{description}</h2>
            <Line ref={chartRef} data={data} options={options} />
            <h3 className='units-period text-sm text-center hidden sm:block'>Year</h3>
        </div>
    );
};

export default LineChart;