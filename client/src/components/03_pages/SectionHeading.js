function SectionHeading() {
    return (
        <div className='site-description flex flex-col gap-y-2 items-center mx-2 sm:mx-0'>
            <h1 className="description-header font-medium text-center text-4xl transition-all duration-400 animate-appear hidden sm:block">
                Welcome to EIA Energy Display!
            </h1>

            <h2 className="how-to-use-h2 font-extrabold tracking-widest text-2xl mt-2 sm:mt-0">
                How to use:
            </h2>

            <ol className="instructions-list flex flex-col text-left gap-3 font-semibold sm:text-xl lg:text-2xl">
                <li>1. Click on the search bar below to open a drop down menu with all U.S. states.</li>
                <li>2. Start typing U.S. State names or abbreviations and the list will automatically update (e.g. 'Maryland' or 'MD' will give you results for Maryland)</li>
                <li>3. Click on the state name or use the down arrow key and enter to update the graph.</li>
                <li>4. You can scroll through the available graphs using the left and right arrows or by clicking and dragging your mouse.</li>
            </ol>
        </div>
    );
};

export default SectionHeading;