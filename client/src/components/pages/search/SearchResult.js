function SearchResult({ stateResults, onSearchText }) {

    const stateList = stateResults.map((state, index) => {
        return <p key={index} className={`${state.name} hover:bg-blue-100 hover:cursor-pointer`} onChange={(e) => {console.log(e)}}>{state.name}</p>
    });

    if(stateResults.length === 0) {
        return (<div></div>)
    };

    return (
        <div className='w-full max-h-64 overflow-y-scroll bg-white flex-col rounded-lg shadow-lg p-3 absolute'>
            {stateList}
        </div>
    );
};

export default SearchResult;