import GraphCard from "./GraphCard";


function GraphParentContainer({ chartData, title, description }) {
    const chartTypes = ["line", "bar", "pie"];

    const graphList = chartTypes.map((type) => {
        console.log(type)

        return <GraphCard key={type} chartData={chartData} type={type} title={title} description={description} />
    });

    console.log(graphList)

    return (
        <section className='graphs container mx-auto'>
            {graphList}
        </section>
    )
};

export default GraphParentContainer;