import GraphCard from "./GraphCard";
import { useState, useEffect } from "react";

function GraphParentContainer({ chartData, chartLabels }) {
    const [graphList, setGraphList] = useState([]);

    useEffect(() => {
        const graphList = chartData.map((fuelData, index) => {
            if (fuelData.isChecked === false) {
                return
            } else {
                return <GraphCard key={index} fuelData={fuelData} fuelLabels={chartLabels[index]} />
            };
        });

        setGraphList(graphList);
    }, [chartData]); // Update graph container state whenever chartdata changes

    return (
        <section className='graphs container pb-5'>
            {graphList.length === 0 ? <></> : graphList}
        </section>
    )
};

export default GraphParentContainer;