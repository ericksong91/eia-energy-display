import GraphCard from "./graphs/GraphCard";

function GraphParentContainer({ chartData }) {
    if (Object.keys(chartData).length === 0) return <></>
    const { stateName, datasets, labels } = chartData;
    const minYear = labels[0];
    const maxYear = labels[labels.length - 1];

    const graphList = datasets.map((dataObj, index) => {
        return <GraphCard key={index} data={dataObj} />
    })

    return (
        <section className='graphs container pb-5'>
            <h2 className="state-name text-2xl sm:text-4xl font-bold text-center">{stateName} Data from {minYear} to {maxYear}</h2>
            {graphList.length === 0 ? <></> : graphList}
        </section>
    );
};

export default GraphParentContainer;