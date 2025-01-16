import React from 'react';

function SearchResult({ stateResults }) {

    const stateList = stateResults.map((state, index) => {
        return <p className={`${state.name}`} key={index}>{state.name}</p>
    });

    return (
        <div className='w-full h-36 overflow-y-scroll bg-white flex-col rounded-lg shadow-lg p-3 absolute'>
            {stateList}
        </div>
    )
};

export default SearchResult;