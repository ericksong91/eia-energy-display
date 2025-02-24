import { useState, useContext } from 'react';
import { useCombobox } from 'downshift';
import { IconContext } from '../../00_context/IconContext';


function SearchBar({ onStatesFilter, stateResults, onUpdateGraphs }) {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { magnifyingGlass } = useContext(IconContext);
  const statesArr = Object.keys(stateResults)?.map((state) => stateResults[state].name) || []
  const [inputItems, setInputItems] = useState(statesArr);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items: statesArr,
    onInputValueChange: ({ inputValue }) => {
      onStatesFilter(inputValue)
    },
  })

  function handleChange(value) {
    setIsFocused(true);
    setSearchText(value);
    onStatesFilter(value);
  }; //handles text

  function handleSearchConfirmation(searchTerm) {
    setSearchText(searchTerm);
    onUpdateGraphs(searchTerm);
  }; //handles old click event

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        justifyContent: 'center',
        marginTop: 100,
        alignSelf: 'center',
      }}
    >

      <label
        style={{
          fontWeight: 'bolder',
          color: selectedItem ? selectedItem : 'black',
        }}
        {...getLabelProps()}
      >
        Choose an element:
      </label>

      <div>
        <input
          style={{ padding: '4px' }}
          {...getInputProps()}
          data-testid="combobox-input"
        />
        <button
          style={{ padding: '4px 8px' }}
          aria-label="toggle menu"
          data-testid="combobox-toggle-button"
          {...getToggleButtonProps()}
        >
          {isOpen ? <>up arrow</> : <>down arrow</>}
        </button>
        <button
          style={{ padding: '4px 8px' }}
          aria-label="toggle menu"
          data-testid="clear-button"
          onClick={() => selectItem(null)}
        >
          Delete Search Results
        </button>
      </div> 
      {/* Responsible for the search panel and the button arrangements */}

      <ul
        {...getMenuProps()}
        style={{
          listStyle: 'none',
          width: '100%',
          padding: '0',
          margin: '4px 0 0 0',
        }}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={{
                padding: '4px',
                backgroundColor: highlightedIndex === index ? '#bde4ff' : null,
              }}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item}
            </li>
          ))}
      </ul>

      {/* Responsible for the inner list */}
    </div>
  )
};

export default SearchBar;