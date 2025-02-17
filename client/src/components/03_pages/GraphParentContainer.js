import { useContext } from "react";
import ChartCard from "./graphs/ChartCard"
import { DarkModeContext } from "../00_context/DarkModeContext";

function GraphParentContainer({ chartData, currentState }) {
    const { graphColors } = useContext(DarkModeContext);

    const y = {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
            display: true,
            text: ``,
            color: graphColors.text,
        },
        ticks: {
            color: graphColors.text,
        },
        grid: {
            color: graphColors.grid,
        },
    };
    const y1 = {
        type: 'linear',
        display: false,
        position: 'right',
        title: {
            display: false,
            text: ``,
            color: graphColors.text,
        },
        ticks: {
            color: graphColors.text,
        },
        grid: {
            display: false,
        },
    }
    const x = {
        ticks: {
            callback: function (value, index) {
                return index % 2 === 0 ? this.getLabelForValue(value) : '';
            },
            color: graphColors.text,
        },
        grid: {
            color: graphColors.grid,
        },
    };

    const graphList = Object.keys(chartData).length === 0 ? [] : chartData.datasets.map((dataObj, index) => {
        const scales = {
            x: x,
            y: {
                ...y,
                title: {
                    ...y.title,
                    text: dataObj.units.y
                },
            },
            y1: {
                ...y1,
                display: dataObj.needsY1,
                title: {
                    ...y1.title,
                    display: dataObj.needsY1,
                    text: dataObj.units.y1,
                }
            },
        };

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
                        color: graphColors.text,
                        font: {
                            size: 15
                        },
                    },
                    onHover: function (e, activeElement) {
                        if (activeElement) e.native.target.style.cursor = "pointer";
                    },
                    onLeave: function (e) {
                        e.native.target.style.cursor = "default";
                    }
                },
            },
        };

        return <ChartCard key={`${index} - ${dataObj.description}`} data={dataObj} options={options} />
    });

    return (
        <>
            {currentState ?
                <section className='graphs container flex flex-col'>
                    <h2 className="state-name-year text-center font-bold mt-10 md:tracking-widest text-2xl sm:text-3xl md:text-4xl animate-appear">
                        {currentState} data from 2008-2023
                    </h2>
                    {graphList}
                </section>
                :
                null
            }
        </>
    );
};

export default GraphParentContainer;