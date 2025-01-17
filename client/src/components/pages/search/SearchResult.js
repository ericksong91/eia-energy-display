function SearchResult({ stateResults, onSearchConfirmation, onIsFocused }) {
    
    function handleClick(value) {
        onSearchConfirmation(value);
        onIsFocused(false);
    };

    const stateList = stateResults.map((state) => {
        return <p key={state.name} className={`${state.name} hover:bg-blue-100 hover:cursor-pointer`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleClick(state.name)}
        >
            {state.name}
        </p>
    });

    if (stateResults.length === 0) {
        return (<div></div>)
    };

    return (
        <div className='w-full max-h-64 overflow-y-scroll bg-white flex-col rounded-lg shadow-lg p-3 absolute'>
            {stateList}
        </div>
    );
};

export default SearchResult;