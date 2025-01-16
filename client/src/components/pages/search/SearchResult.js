import React from 'react';

function SearchResult({ stateResults }) {

    const stateList = stateResults.map((state, index) => {
        return <p key={index}>{state.name}</p>
    });

    return (
        <div className='w-full flex flex-col shadow-lg rounded-lg mt-4 max-[300px] overflow-y-scroll px-3 scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-600'>
            {stateList}
        </div>
    )
};

export default SearchResult;