import { useState } from "react"

const downArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

const upArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>

function FilterAccordion() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const fuelsList = ["Coal", "Petroleum", "Natural Gas", "Other"];

  const fuelCheckboxes = fuelsList.map((e) => {
    return (
      <div key={e} className="flex items-center mb-4">
        <input
          type="checkbox"
          value={e}
          onChange={(e) => console.log(e.target.value)}
          className={`${e}-checkbox w-4 h-4 text-blue-600 
                  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                  dark:bg-gray-700 dark:border-gray-600`}
          checked
        />
        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{e}</label>
      </div>
    );
  }); // Map an array of options for the accordiion so user can choose which fuel types to display

  return (
    <div className="accordion container mx-auto">
      <div className="m-4 p-4 bg-blue-200 rounded-lg">
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
              <div className="fuel-checkboxes pt-4 pl-2">
                {fuelCheckboxes}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};

export default FilterAccordion;

// When you use [] in tailwind, you can add custom values