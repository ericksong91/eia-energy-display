import GraphCard from "./graphs/GraphCard";

function GraphParentContainer({ chartData, isCheckedArr }) {
    if (Object.keys(chartData).length === 0) return <></>
    const { stateName, dataSetsObj, labels } = chartData;
    const minYear = labels[0];
    const maxYear = labels[labels.length - 1];

    const combinedDataList = Object.keys(dataSetsObj)?.map(key => {
        switch (key) {
            case "emissionsDataSet":
                return {
                    datasets: dataSetsObj[key],
                    labels: labels,
                    title: "Emissions (CO2, SO2, NOx)",
                    description: `Combined Emissions from CO2, SO2 and NOx`,
                    isChecked: isCheckedArr[0],
                };
            case "netGenDataSet":
                return {
                    datasets: dataSetsObj[key],
                    labels: labels,
                    title: "Net Generation",
                    description: `Total Net Generation`,
                    isChecked: isCheckedArr[1],
                };
            case "avgPriceDataSet":
                return {
                    datasets: dataSetsObj[key],
                    labels: labels,
                    title: "Average Retail Price",
                    description: `Average retail price`,
                    isChecked: isCheckedArr[2],
                };
        };
    });

    // Make Graphlist

    const graphList = combinedDataList.map((dataObj, index) => {
        return <GraphCard key={index} data={dataObj} />
    })

    return (
        <section className='graphs container pb-5'>
            <h2 className="state-name text-4xl font-medium text-center">{stateName}</h2>
            {graphList.length === 0 ? <></> : graphList}
            {/* <GraphCard data={emissionsObj} isChecked={true} /> */}
        </section>
    )
};

export default GraphParentContainer;