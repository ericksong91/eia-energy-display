import { motion } from "motion/react";

function SectionHeading() {
    return (
        <motion.div initial={{ opacity: 0, x: -400 }} animate={{ x: 0, opacity: 100 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 1}}>
            <div className='site-main-heading flex flex-col items-center'>
                <h2 className="description-title font-medium text-center text-xl mb-2 md:mt-2 md:mb-5 md:text-2xl lg:mt-4 lg:mb-10 lg:text-4xl hidden sm:block">Welcome to EIA Energy Display!</h2>
            </div>
        </motion.div >
    );
}; // Temporary card for heading.

export default SectionHeading;