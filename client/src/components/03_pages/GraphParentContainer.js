import GraphCard from "./graphs/GraphCard";

function GraphParentContainer({ chartData, isCheckedArr }) {
    if (Object.keys(chartData).length === 0) return <></>
    const { stateName, datasets, labels } = chartData;
    const minYear = labels[0];
    const maxYear = labels[labels.length - 1];

    const emissionsObj = {
        datasets: datasets?.filter((data) => data.isEmission === true),
        labels: labels,
        title: "Emissions (CO2, SO2, NOx)",
        description: `Emissions data from ${minYear} to ${maxYear} for ${stateName}`,
        isChecked: isCheckedArr[0],
    }; // Might need to package this later

    const netGenObj = {
        datasets: datasets?.filter((data) => data.isEmission === false).filter((d) => d.data),
        labels: labels,
        title: "Net Generation",
        description: `Total Net Generation from ${minYear} to ${maxYear} for ${stateName}`,
        isChecked: isCheckedArr[1],
    };

    const avgPriceObj = {
        datasets: datasets?.filter((data) => data.label === "avg_price"),
        labels: labels,
        title: "Average Retail Price",
        description: `Average retail price from ${minYear} to ${maxYear} for ${stateName}`,
        isChecked: isCheckedArr[2],
    };

    const combinedDataArr = [emissionsObj, netGenObj, avgPriceObj]; //Probably refactor this into a map

    // Make Graphlist

    const graphList = combinedDataArr.map((dataObj, index) => {
        return <GraphCard key={index} data={dataObj} />
    })

    return (
        <section className='graphs container pb-5'>
            {graphList.length === 0 ? <></> : graphList}
            {/* <GraphCard data={emissionsObj} isChecked={true} /> */}
        </section>
    )
};

export default GraphParentContainer;