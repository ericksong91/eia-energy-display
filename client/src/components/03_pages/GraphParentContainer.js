import { useContext } from "react";
import ChartCard from "./graphs/ChartCard"
import { Carousel } from "flowbite-react";
import { IconContext } from "../00_context/IconContext";

function GraphParentContainer({ chartData }) {
    const { leftIcon, rightIcon } = useContext(IconContext);

    const graphList = Object.keys(chartData).length === 0 ? [] : chartData.datasets.map((dataObj, index) => {
        return <ChartCard key={`${index} - ${dataObj.description}`} data={dataObj} />
    });

    return (
        Object.keys(chartData).length === 0 ?
            null
            :
            <section className='graphs container pb-5 transition-all duration-600 animate-appear bg-light-background sm:bg-opacity-65 sm:bg-light-primary sm:rounded-lg'>
                <Carousel slide={false} leftControl={leftIcon} rightControl={rightIcon} indicators={false}>
                    {graphList}
                </Carousel>
            </section>
    );
};

export default GraphParentContainer;