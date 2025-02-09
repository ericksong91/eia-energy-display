import GraphCard from "./graphs/GraphCard";

function GraphParentContainer({ chartData }) {

    console.log(chartData)
    const graphList = []
    // const graphList = <GraphCard key={index} fuelData={fuelData} fuelLabels={chartLabels[index]} isChecked={fuelData.isChecked} />

    return (
        <section className='graphs container pb-5'>
            {graphList.length === 0 ? <></> : graphList}
        </section>
    )
};

export default GraphParentContainer;