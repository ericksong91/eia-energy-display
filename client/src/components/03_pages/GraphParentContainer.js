import GraphCard from "./graphs/GraphCard";
import { useState, useEffect } from "react";

function GraphParentContainer({ chartData, chartLabels }) {
    const [graphList, setGraphList] = useState([]);
    console.log(chartData)

    useEffect(() => {
        const graphList = chartData.map((fuelData, index) => {
            // if (fuelData.isChecked === false) {
            //     return null
            // } else {
            //     return <GraphCard key={index} fuelData={fuelData} fuelLabels={chartLabels[index]} isChecked={fuelData.isChecked} />
            // };
            return <GraphCard key={index} fuelData={fuelData} fuelLabels={chartLabels[index]} isChecked={fuelData.isChecked} />
        });

        setGraphList(graphList);
    }, [chartData, chartLabels]); // Update graph container state whenever chartdata changes

    return (
        <section className='graphs container pb-5'>
            {graphList.length === 0 ? <></> : graphList}
        </section>
    )
};

export default GraphParentContainer;