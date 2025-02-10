import { useContext, useState } from "react"
import { IconContext } from "../00_context/IconContext";

function FilterAccordion({ isCheckedArr, onIsCheckedArr, chartTypes, onAccordionFuelFilter }) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const { upArrow, downArrow } = useContext(IconContext);

  function checkboxChangeHandler(index) {
    // const newChecks = [...isCheckedArr];
    // newChecks.splice(index, 1, !isCheckedArr[index]);

    // onIsCheckedArr(newChecks);
    // onAccordionFuelFilter(newChecks);
  };

  const chartCheckboxes = chartTypes.map((type, index) => {
    return (
      <div key={`${type}-${index}`} className="flex items-center mb-4">
        <input
          type="checkbox"
          value={type}
          onChange={() => checkboxChangeHandler(index)}
          className={`
                    ${type}-checkbox 
                    w-4 h-4 text-blue-600 
                  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                  dark:bg-gray-700 dark:border-gray-600
                  `}
          checked={isCheckedArr[index]}
        />
        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{type}</label>
      </div>
    );
  }); // Map an array of options for the accordiion so user can choose which type types to display

  return (
    <div className="accordion container mx-auto">
      <div className="m-4 p-4 bg-light-main sm:bg-light-seco rounded-lg">
        <div className='py-2'>
          <button className='flex justify-between w-full' onClick={() => setAccordionOpen(!accordionOpen)}>
            <span className="text-md">Filter Results by Fuel Type:</span>
            {accordionOpen
              ? <span>{upArrow}</span>
              : <span>{downArrow}</span>
            }
          </button>

          <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm 
             ${accordionOpen
              ? `grid-rows-[1fr] opacity-100`
              : `grid-rows-[0fr] opacity-0`
            }`}>
            <div className="overflow-hidden">
              <div className="chartType-checkboxes pt-4 pl-2">
                {chartCheckboxes}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};

export default FilterAccordion;