function SectionHeading() {
    return (
        <div className='site-main-heading flex flex-col items-center'>
            <h1>U.S. Energy Information Association</h1>
            <p>The purpose of this site is to display data from the EIA's API in an easy to look at format.</p>
            <ol className='instructions list-decimal list-inside'>
                <li>First, click on the search bar below to display a list of U.S. States or begin typing to search for a state</li>
                <li>You can click on a U.S. State or you can use your arrow keys and hit enter to select one</li>
                <li>After selecting a state, graphs should automatically appear below the filter</li>
            </ol>
        </div>
    );
};

export default SectionHeading;