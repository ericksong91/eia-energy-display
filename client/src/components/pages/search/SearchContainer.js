import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

function SearchContainer({onStatesFilter, stateResults}) {
    return (
        <div>
            <SearchBar onStatesFilter={onStatesFilter} />
            <SearchResult stateResults={stateResults} />
        </div>
    )
};

export default SearchContainer;