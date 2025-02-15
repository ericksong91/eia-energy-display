function SectionHeading({ currentState }) {
    return (
        <div className='site-description flex flex-col items-center transition-all duration-400 animate-appear'>
            <h1 className="description-header font-medium text-center text-2xl my-2 sm:mt-2 md:mb-5 md:text-2xl lg:mt-4 lg:mb-10 lg:text-4xl hidden sm:block">
                Welcome to EIA Energy Display!
            </h1>

            <h2 className="how-to-use-h2 font-bold tracking-widest text-2xl mb-4 md:text-3xl">
                How to use:
            </h2>

            <ol className="instructions-list text-black px-6 md:mx-4 sm:text-xl lg:text-2xl">
                <li>1. Click on search bar to open a drop down</li>
                <li>2. Start typing U.S. State names or abbreviations and the list will automatically update (i.e. 'Maryland' or 'MD' will give you results for Maryland)</li>
                <li>3. Click on the state name or use the down arrow key and enter to update the graph</li>
                <li>4. Use the arrow keys or the left and right arrows on the side of the graph to scroll through the data sets</li>
            </ol>
            
            <div className="state-name mt-10">
                {currentState ? <h2>{currentState}</h2> : <h2 className="please-select-h2 font-bold tracking-widest text-xl">Please select a state!</h2>}
            </div>
        </div>
    );
};

export default SectionHeading;