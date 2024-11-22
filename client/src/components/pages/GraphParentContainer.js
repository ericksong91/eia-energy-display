import React from 'react'
import GraphCard from './GraphCard';

function GraphParentContainer({ chartData }) {
    const chartTypes = ["line", "bar"];

    const chartList = chartTypes.map((x) => {
        return <GraphCard key={x} chartData={chartData} chartType={x} />
    });

    return (
        <section className='graphs container mx-auto'>
            <div className='flex-auto'>
                {chartList}
                {/* {<GraphCard chartData={chartData} chartType={"bar"} />} */}
            </div>
        </section>
    )
};

export default GraphParentContainer;