import { useState, useContext } from 'react';
import { useCombobox } from 'downshift';
import { IconContext } from '../../00_context/IconContext';

function SearchBar({ onUpdateGraphs }) {
  const { magnifyingGlass, states } = useContext(IconContext);
  const [inputItems, setInputItems] = useState(states);

  function handleStatesFilter(value) {
    const result = states.filter((state) => {
      // return state.name.toLowerCase().includes(value.toLowerCase()) || state.abbreviation.toLowerCase().includes(value.toLowerCase())
      return state.toLowerCase().includes(value.toLowerCase());
    });

    return result;
  }; // filters search terms

  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem, selectItem, } =
    useCombobox(
      {
        items: inputItems,
        onInputValueChange: ({ inputValue }) => {
          setInputItems(handleStatesFilter(inputValue));
        },
        onSelectedItemChange:
          ({ selectedItem, inputValue }) => {
            onUpdateGraphs(selectedItem, inputValue);
          },
      });

  return (
    <div className='search-bar-combobox'>
      <label {...getLabelProps()}>
        Choose an element:
      </label>
      <div className='input-and-select-menu'>
        <input {...getInputProps()} data-testid="combobox-input"/>
        <button aria-label="toggle menu" data-testid="combobox-toggle-button" {...getToggleButtonProps()}>
          {isOpen ? <>up arrow</> : <>down arrow</>}
        </button>
        <button aria-label="toggle menu" data-testid="clear-button" onClick={() => selectItem(null)}>
          Clear Field
        </button>
      </div>

      <ul className='select-options' {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li className={`${item}-option`} key={`${item}${index}`} {...getItemProps({item,index,})}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
};

export default SearchBar;