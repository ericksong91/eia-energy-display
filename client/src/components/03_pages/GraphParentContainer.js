import GraphCard from "./graphs/GraphCard";
import { Carousel } from "flowbite-react";
import { IconContext } from "../00_context/IconContext";
import { useContext } from "react";
import { motion } from "motion/react"

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
        <section className='graphs container bg-light-background sm:bg-opacity-65 sm:bg-light-primary rounded-lg pb-5'>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ x: 0, opacity: 100 }} exit={{ x: 10, opacity: 0 }} transition={{duration: 0.8}}>
                {Object.keys(chartData).length === 0 ?
                    <Carousel></Carousel>
                    :
                    <Carousel slide={false} leftControl={leftIcon} rightControl={rightIcon} indicators={false}>
                        {graphList}
                    </Carousel>
                }
            </motion.div>
        </section>
    );
};

export default GraphParentContainer;