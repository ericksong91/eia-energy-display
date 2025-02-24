import { useState } from 'react';
import { useCombobox } from 'downshift';

const colors = [
    'Black',
    'Red',
    'Green',
    'Blue',
    'Orange',
    'Purple',
    'Pink',
    'Orchid',
    'Aqua',
    'Lime',
    'Gray',
    'Brown',
    'Teal',
    'Skyblue',
]

const states = ['United States', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

function SelectStates({ statesArray, onSearchConfirmation, onIsFocused }) {
    const [inputItems, setInputItems] = useState(colors);


    return (
        <div>
            <div>
                <input {...getInputProps()} />
                <button {...getToggleButtonProps()}>
                    {isOpen ? <>&#8593;</> : <>&#8595;</>}
                </button>
                <button onClick={() => selectItem(null)}>
                    &#10007;
                </button>
            </div>
            <ul {...getMenuProps()}>
                {isOpen &&
                    inputItems.map((item, index) => (
                        <li
                            key={`${item}${index}`}
                            {...getItemProps({
                                item,
                                index,
                            })}>
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    )


}


export default SelectStates;