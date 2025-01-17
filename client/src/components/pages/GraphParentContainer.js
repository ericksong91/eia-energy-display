import GraphCard from "./GraphCard";

function GraphParentContainer({ chartData, title, description }) {
    const chartTypes = ["line"];
    // Include "Pie", "Bar" to get pie chart back

    // if (Object.keys(chartData).length === 0) {
    //     return (<div></div>)
    // };

    const graphList = chartTypes.map((type) => {
        return <GraphCard key={type} chartData={chartData} type={type} title={title} description={description} />
    });

    return (
        <section className='graphs container mx-auto pb-5'>
            {graphList}
        </section>
    )
};

export default GraphParentContainer;