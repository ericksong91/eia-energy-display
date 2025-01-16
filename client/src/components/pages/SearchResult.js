import React from 'react';

function SearchResult({ stateResults }) {

    const stateList = stateResults.map((state, index) => {
        return <p key={index}>{state.name}</p>
    });

    return (
        <div>
            {stateList}
        </div>
    )
};

export default SearchResult;