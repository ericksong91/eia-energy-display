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

  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem, } =
    useCombobox(
      {
        items: inputItems,
        // itemToString: ({item}) => {
        //   console.log(item)
        //   return item.name
        // },
        onInputValueChange: ({ inputValue }) => {
          setInputItems(handleStatesFilter(inputValue));
        },
        onSelectedItemChange: ({ selectedItem }) => {
          onUpdateGraphs(selectedItem);
        },
      });

  return (
    <div className='search-bar-combobox w-full mx-auto'>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" {...getLabelProps()}>
        Search for States or Click to Select States
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          {magnifyingGlass}
        </div>

        <input {...getInputProps()}
          className='combobox-search block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
            bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500'
          placeholder="Search for States or Click to Select States..."
        />

        <button {...getToggleButtonProps()} className='toggle-select-options text-light-text absolute end-2.5 bottom-2.5 bg-light-accent hover:bg-opacity-40 focus:ring-2 focus:outline-none 
            focus:ring-light-text font-medium rounded-lg text-sm px-4 py-2 dark:bg-dark-text dark:hover:bg-opacity-70 dark:focus:ring-dark-accent'>
          {isOpen ? <>&#8593;</> : <>&#8595;</>}
        </button>

        <ul className={`select-options absolute hide-scrollbar max-h-64 p-3 mt-1 w-full overflow-y-scroll flex-col ${isOpen ? 'bg-white rounded-lg shadow-lg z-50 dark:bg-dark-background' : ''}`} {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => (
              <li key={`${item}${index}`} {...getItemProps({ item, index, })}
                className={`${item}-option ${selectedItem === item ? 'font-bold bg-blue-100 dark:bg-blue-600' : 'font-normal'} 
                ${highlightedIndex === index ? 'hover:font-bold hover:bg-blue-100 dark:hover:bg-blue-800' : ''} cursor-pointer`}>
                {item}
              </li>
            ))}
        </ul>
      </div>


    </div>
  )
};

export default SearchBar;