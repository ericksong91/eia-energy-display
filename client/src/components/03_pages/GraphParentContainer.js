import GraphCard from "./graphs/GraphCard";
import { Carousel } from "flowbite-react";
import { IconContext } from "../00_context/IconContext";
import { useContext } from "react";

function GraphParentContainer({ chartData }) {
    const { leftIcon, rightIcon } = useContext(IconContext);
    if (Object.keys(chartData).length === 0) return <></>

    const { datasets } = chartData;

    const graphList = datasets.map((dataObj, index) => {
        return <GraphCard key={`${index} - ${dataObj.description}`} data={dataObj} />
    });

    return (
        <section className='graphs container bg-light-background sm:bg-opacity-65 sm:bg-light-primary rounded-lg pb-5'>
            <Carousel slide={false} leftControl={leftIcon} rightControl={rightIcon} indicators={false}>
                {graphList}
            </Carousel>
        </section>
    );
};

export default GraphParentContainer;