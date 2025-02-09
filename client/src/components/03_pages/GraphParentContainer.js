import GraphCard from "./graphs/GraphCard";

function GraphParentContainer({ chartData }) {
    if(Object.keys(chartData).length === 0) return <div></div>

    const { datasets, labels } = chartData;

    const emissionsObj = {
        datasets: datasets?.filter((data) => data.isEmission === true),
        labels: labels,
    };

    // const netGenObj = {
    //     datasets: datasets?.filter((data) => data.label === "net_generation"),
    //     labels: labels,
    // };

    // const avgPriceObj = {
    //     datasets: datasets?.filter((data) => data.label === "avg_price"),
    //     labels: labels,
    // };

    // const graphList = <GraphCard key={index} fuelData={fuelData} fuelLabels={chartLabels[index]} isChecked={fuelData.isChecked} />

    return (
        <section className='graphs container pb-5'>
            {/* {graphList.length === 0 ? <></> : graphList} */}
            <GraphCard data={emissionsObj} isChecked={true} />
        </section>
    )
};

export default GraphParentContainer;