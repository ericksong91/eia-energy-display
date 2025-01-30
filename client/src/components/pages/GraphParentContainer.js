import GraphCard from "./GraphCard";

function GraphParentContainer({ chartData, chartLabels }) {
    const graphList = chartData.map((fuelData, index) => {
        return <GraphCard key={index} fuelData={fuelData} fuelLabels={chartLabels[index]} />
    });

    return (
        <section className='graphs container mx-auto pb-5'>
            {graphList.length === 0 ? <></> : graphList}
        </section>
    )
};

export default GraphParentContainer;