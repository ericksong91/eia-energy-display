import { useContext } from "react";
import ChartCard from "./graphs/ChartCard"
import { Carousel } from "flowbite-react";
import { IconContext } from "../00_context/IconContext";
import { DarkModeContext } from "../00_context/DarkModeContext";

function GraphParentContainer({ chartData }) {
    const { leftIcon, rightIcon } = useContext(IconContext);
    const { graphTextColor } = useContext(DarkModeContext);
    const y = {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
            display: true,
            text: ``,
            color: graphTextColor,
        },
        ticks: {
            color: graphTextColor,
        },
    };
    const x = {
        ticks: {
            color: graphTextColor,
        },
    };
    const unitTypes = {
        co2: "kmt (CO2)",
        so2: "mt (SO2, NOx)",
        nox: "mt",
        net_generation: "thousand megawatt hour (kMWh)",
        avg_price: "cents per kilowatt hour (¢/KWh)",
        co2_per_mwh: "pounds per megawatt hour (lbs/mwh)",
        so2_per_mwh: "pounds per megawatt hour (lbs/mwh)",
        nox_per_mwh: "pounds per megawatt hour (lbs/mwh)",
    };

    const graphList = Object.keys(chartData).length === 0 ? [] : chartData.datasets.map((dataObj, index) => {
        const scales = {
            x: x,
            y: y,
            y1: {
                type: 'linear',
                display: dataObj.needsY1,
                position: 'right',
                title: {
                    display: dataObj.needsY1,
                    text: ``,
                    color: graphTextColor,
                },
                ticks: {
                    color: graphTextColor,
                },
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
                        font: {
                            size: 15
                        },
                    },
                },
            },
        };

        return <ChartCard key={`${index} - ${dataObj.description}`} data={dataObj} options={options} />
    });

    return (
        Object.keys(chartData).length === 0 ?
            null
            :
            <section className='graphs container pb-5 transition-all duration-600 animate-appear bg-light-background sm:bg-opacity-65 sm:bg-light-primary sm:rounded-lg'>
                <Carousel slide={false} leftControl={leftIcon} rightControl={rightIcon} indicators={false}>
                    {graphList}
                </Carousel>
            </section>
    );
};

export default GraphParentContainer;


// const scales = {
//     y: {
//         type: 'linear',
//         display: true,
//         position: 'left',
//         title: {
//             display: true,
//             text: ``,
//             color: graphTextColor,
//         },
//         ticks: {
//             callback: function (value, index) {
//                 return index % 2 === 0 ? this.getLabelForValue(value) : '';
//             },
//             color: graphTextColor,
//         },
//     },
//     y1: {
//         type: 'linear',
//         display: needsY1,
//         position: 'right',
//         title: {
//             display: needsY1,
//             text: ``,
//             color: graphTextColor,
//         },
//         ticks: {
//             callback: function (value, index) {
//                 return index % 2 === 0 ? this.getLabelForValue(value) : '';
//             },
//             color: graphTextColor,
//         },
//     },
//     x: {
//         ticks: {
//             callback: function (value, index) {
//                 return index % 2 === 0 ? this.getLabelForValue(value) : '';
//             },
//             color: graphTextColor,
//         },
//     },
// }; // Can add another scale if needed; using y1, y2, etc