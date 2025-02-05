function SectionHeading() {
    return (
        <div className='site-main-heading flex flex-col items-center mt-4 p-4'>
            <h1 className="heading mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">EIA Energy Display</h1>
            <div className="instructions-and-details-card bg-light-secondary rounded-lg drop-shadow-md sm:drop-shadow-none sm:bg-none">
                <p>The purpose of this site is to display data from the EIA's API in an easy to look at format.</p>
                <ol className='instructions list-decimal list-inside'>
                    <li>First, click on the search bar below to display a list of U.S. States or begin typing to search for a state</li>
                    <li>You can click on a U.S. State or you can use your arrow keys and hit enter to select one</li>
                    <li>After selecting a state, graphs should automatically appear below the filter</li>
                </ol>
            </div>
        </div>
    );
}; // Temporary card for heading.

export default SectionHeading;