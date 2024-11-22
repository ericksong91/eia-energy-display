import { useState } from "react"

function FilterAccordion() {
  const [accordionOpen, setAccordionOpen] = useState(false);


  const downArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>

  const upArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>

  return (
    <div className="accordion container mx-auto">
      <div className="m-4 p-4 bg-blue-200 rounded-lg">
        <div className='py-2'>
          <button className='flex justify-between w-full' onClick={() => setAccordionOpen(!accordionOpen)}>
            <span>Filter Results</span>
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
              These are the filter options
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};

export default FilterAccordion;

// When you use [] in tailwind, you can add custom values