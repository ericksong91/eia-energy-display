import { useContext } from "react";
import GraphCard from "./graphs/GraphCard";
import { Carousel } from "flowbite-react";
import { IconContext } from "../00_context/IconContext";

function GraphParentContainer({ chartData }) {
    const { leftIcon, rightIcon } = useContext(IconContext);

    const graphList = Object.keys(chartData).length === 0 ? [] : chartData.datasets.map((dataObj, index) => {
        return <GraphCard key={`${index} - ${dataObj.description}`} data={dataObj} />
    });

    return (
        Object.keys(chartData).length === 0 ?
            null
            :
            <section className='graphs container transition-opacity duration-400 animate-appear bg-light-background sm:bg-opacity-65 sm:bg-light-primary rounded-lg pb-5'>
                <Carousel slide={false} leftControl={leftIcon} rightControl={rightIcon} indicators={false}>
                    {graphList}
                </Carousel>
                {/* Custom Indicators */}

            </section>
    );
};

export default GraphParentContainer;