import GraphCard from "./graphs/GraphCard";
import { Carousel } from "flowbite-react";
import { IconContext } from "../00_context/IconContext";
import { useContext } from "react";

function GraphParentContainer({ chartData }) {
    const { leftIcon, rightIcon } = useContext(IconContext);
    if (Object.keys(chartData).length === 0) return <></>

    const { stateName, datasets, labels } = chartData;
    const minYear = labels[0];
    const maxYear = labels[labels.length - 1];

    const graphList = datasets.map((dataObj, index) => {
        return <GraphCard key={`${index} - ${dataObj.description}`} data={dataObj} />
    })

    return (
        <section className='graphs container bg-light-background sm:bg-light-primary rounded-lg pb-5'>
            {Object.keys(chartData).length === 0 ?
                <Carousel></Carousel>
                :
                <Carousel slide={false} leftControl={leftIcon} rightControl={rightIcon} indicators={false}>
                    {graphList}
                </Carousel>
            };
        </section>
    );
};

export default GraphParentContainer;