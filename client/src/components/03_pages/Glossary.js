import { useContext, useState } from "react"
import { IconContext } from "../00_context/IconContext";

const terms = [
  {
    name: "Carbon Dioxide (CO2)",
    description: "A colorless, odorless, non-poisonous gas that is a normal part of Earth's atmosphere. Carbon dioxide is a product of fossil-fuel combustion as well as other processes. It is considered a greenhouse gas as it traps heat (infrared energy) radiated by the Earth into the atmosphere and thereby contributes to the potential for global warming. Graph displays measurements in thousand metric tons (kmt)."
  },
  {
    name: "Sulfer Dioxide (SO2)",
    description: "A toxic, irritating, colorless gas soluble in water, alcohol, and ether. A byproduct of burning fossil fuels and contributes to acid rain. Graph displays measurements in short-tons (st)"
  },
  {
    name: "Nitrogen Oxides (NOx)",
    description: "Compounds of nitrogen and oxygen produced by burning of fossil fuels. Graph displays measurements in short-tons (st)"
  },
  {
    name: "Net Generation (MWh)",
    description: "Amount of electricity measured in megawatthours (MWh) a.k.a. 1000 kilowatthours (KWh). Graph displays measurements in 1000 MWh increments."
  },
  {
    name: "Average Price (¢/KWh)",
    description: "Average cost of electricity. Graph displays costs in cents per kilowatthour (¢/KWh)."
  },
  {
    name: "Emissions per MWh (lbs/MWh)",
    description: "Displays trends the rate of greenhouse gasses (CO2, SO2, NOx) emitted in lbs per megawatthour of power generated. Graph displays measurements in lbs/MWh."
  },
];

function GlossaryAccordion() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const { upArrow, downArrow } = useContext(IconContext);

  const glossList = terms.map((term, index) => {
    return <li key={`${term.name}-${index}`} className={`${term.name}-list-definition`}>
      <span className={`${term.name}-name font-bold`}>{term.name}: </span>
      <span className={`${term.description}-desc text-sm`}>{term.description}</span>
    </li>
  });

  return (
    <div className="accordion mt-2 mx-4">
      <button className='flex justify-between w-full' onClick={() => setAccordionOpen(!accordionOpen)}>
        <h2 className="how-to-use-h2 font-extrabold tracking-widest text-lg sm:text-xl md:text-2xl sm:mt-0">
          Glossary<sup className="ref-sup text-sm">[1]</sup>:
        </h2>

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
          <ol className="ol-for-glossary-terms flex flex-col gap-y-3 text-md">
            {glossList}
          </ol>
        </div>
      </div>
    </div>
  )
};

export default GlossaryAccordion;