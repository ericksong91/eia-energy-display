function SectionHeading() {
    






    return (
        <div className='site-description mx-4 mb-2 sm:mx-0 sm:mb-0'>
            <h2 className="how-to-use-h2 font-extrabold tracking-widest text-3xl mb-4">
                Instructions:
            </h2>
            <ol className="instructions-list flex flex-col gap-y-2 text-left tracking-widest font-semibold sm:text-xl lg:text-2xl">
                <li>1. Click on the search bar below to open a drop down menu with all U.S. states.</li>
                <li>2. Start typing U.S. State names or abbreviations and the list will automatically update.</li>
                <li className="indent-10"> *(e.g. Typing 'Maryland' or 'MD' will give you results for Maryland)</li>
                <li>3. Click on the state name to update the graph.</li>
                <li>4. You can hide data on each graph by clicking on their respective labels in the legend.</li>
                <li>5. Click on the glossary below to get some background on terms.</li>
            </ol>
        </div>
    );
};

export default SectionHeading;