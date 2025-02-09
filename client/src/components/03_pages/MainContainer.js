import { useState } from 'react';
import fetchData from '../01_helpers/fetchData';
import SectionHeading from './SectionHeading';
import FilterAccordion from './FilterAccordion';
import GraphParentContainer from './GraphParentContainer';
import SearchBar from './search/SearchBar';

const states = [
  {
    "name": "United States",
    "abbreviation": "USA"
  },
  {
    "name": "Alabama",
    "abbreviation": "AL"
  },
  {
    "name": "Alaska",
    "abbreviation": "AK"
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ"
  },
  {
    "name": "Arkansas",
    "abbreviation": "AR"
  },
  {
    "name": "California",
    "abbreviation": "CA"
  },
  {
    "name": "Colorado",
    "abbreviation": "CO"
  },
  {
    "name": "Connecticut",
    "abbreviation": "CT"
  },
  {
    "name": "Delaware",
    "abbreviation": "DE"
  },
  {
    "name": "District of Columbia",
    "abbreviation": "DC"
  },
  {
    "name": "Florida",
    "abbreviation": "FL"
  },
  {
    "name": "Georgia",
    "abbreviation": "GA"
  },
  {
    "name": "Hawaii",
    "abbreviation": "HI"
  },
  {
    "name": "Idaho",
    "abbreviation": "ID"
  },
  {
    "name": "Illinois",
    "abbreviation": "IL"
  },
  {
    "name": "Indiana",
    "abbreviation": "IN"
  },
  {
    "name": "Iowa",
    "abbreviation": "IA"
  },
  {
    "name": "Kansas",
    "abbreviation": "KS"
  },
  {
    "name": "Kentucky",
    "abbreviation": "KY"
  },
  {
    "name": "Louisiana",
    "abbreviation": "LA"
  },
  {
    "name": "Maine",
    "abbreviation": "ME"
  },
  {
    "name": "Maryland",
    "abbreviation": "MD"
  },
  {
    "name": "Massachusetts",
    "abbreviation": "MA"
  },
  {
    "name": "Michigan",
    "abbreviation": "MI"
  },
  {
    "name": "Minnesota",
    "abbreviation": "MN"
  },
  {
    "name": "Mississippi",
    "abbreviation": "MS"
  },
  {
    "name": "Missouri",
    "abbreviation": "MO"
  },
  {
    "name": "Montana",
    "abbreviation": "MT"
  },
  {
    "name": "Nebraska",
    "abbreviation": "NE"
  },
  {
    "name": "Nevada",
    "abbreviation": "NV"
  },
  {
    "name": "New Hampshire",
    "abbreviation": "NH"
  },
  {
    "name": "New Jersey",
    "abbreviation": "NJ"
  },
  {
    "name": "New Mexico",
    "abbreviation": "NM"
  },
  {
    "name": "New York",
    "abbreviation": "NY"
  },
  {
    "name": "North Carolina",
    "abbreviation": "NC"
  },
  {
    "name": "North Dakota",
    "abbreviation": "ND"
  },
  {
    "name": "Ohio",
    "abbreviation": "OH"
  },
  {
    "name": "Oklahoma",
    "abbreviation": "OK"
  },
  {
    "name": "Oregon",
    "abbreviation": "OR"
  },
  {
    "name": "Pennsylvania",
    "abbreviation": "PA"
  },
  {
    "name": "Rhode Island",
    "abbreviation": "RI"
  },
  {
    "name": "South Carolina",
    "abbreviation": "SC"
  },
  {
    "name": "South Dakota",
    "abbreviation": "SD"
  },
  {
    "name": "Tennessee",
    "abbreviation": "TN"
  },
  {
    "name": "Texas",
    "abbreviation": "TX"
  },
  {
    "name": "Utah",
    "abbreviation": "UT"
  },
  {
    "name": "Vermont",
    "abbreviation": "VT"
  },
  {
    "name": "Virginia",
    "abbreviation": "VA"
  },
  {
    "name": "Washington",
    "abbreviation": "WA"
  },
  {
    "name": "West Virginia",
    "abbreviation": "WV"
  },
  {
    "name": "Wisconsin",
    "abbreviation": "WI"
  },
  {
    "name": "Wyoming",
    "abbreviation": "WY"
  }
];

const resource = fetchData('/states');

function MainContainer() {
  const energyData = resource.read();
  console.log(energyData)
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]); // Refactor to put this data inside chartData instead, if it makes sense
  const [stateResults, setStateResults] = useState(states);
  const [isChecked, setIsChecked] = useState(Array(5).fill(true));
  const chartTypes = ["Emissions (CO2, SO2, NOx), Electricity Generated (MWh), Average Price (¢/kWh)"];

  /*

  HELPER FUNCTIONS FOR PACKAGING CHART DATA

  */

  // FOR GRAPHS

  // function makeDataSet(searchResult, stateData) {
  //   const xAxisLabels = stateData.filter((data) => data.fuel_id === fuelID).map((d) => d.year); // X axis corresponding data labels
  //   const fuelData = emissionTypes.map((emissionName) => {
  //     const emissionDataObj = {
  //       label: `${chartTypes[fuelID - 1]} ${emissionName.toUpperCase()} Emissions from 1990 to 2023`,
  //       data: stateData.filter((data) => data.fuel_id === fuelID).map((d) => d[emissionName]),
  //       yAxisID: 'y',
  //     };
  //     return emissionDataObj;
  //   }); // fuel data that corresponds to Y axis

  //   const fuelChartLabels = {
  //     title: searchResult,
  //     description: `CO2, SO2 and NOx emissions from ${chartTypes[fuelID - 1]}`,
  //     units: `Placeholder Units`,
  //   };

  //   return {
  //     fuelData: fuelData,
  //     fuelChartLabels: fuelChartLabels,
  //     xAxisLabels: xAxisLabels,
  //   };
  // };

  //

  /*

  FUNCTIONS THAT UPDATE CHART STATE

  */

  function handleUpdateGraphs(searchResult) {
    const stateData = energyData.filter((data) => data.name === searchResult).map((d) => d.periods)[0]; // Use searchResult prop to filter data by US State


  }

  // SEARCH BAR AND FILTER ACCORDION

  function handleStatesFilter(value) {
    const result = states.filter((state) => {
      return state.name.toLowerCase().includes(value.toLowerCase()) || state.abbreviation.toLowerCase().includes(value.toLowerCase())
    });

    setStateResults(result);
  };

  // function handleAccordionFuelFilter(newChecks) {
  //   if (chartData.length === 0) {
  //     return
  //   } else {
  //     const updatedChartList = chartData.map((fuelData, index) => {
  //       const newFuelObj = {
  //         labels: fuelData.labels,
  //         datasets: fuelData.datasets,
  //         isChecked: newChecks[index],
  //       };

  //       return newFuelObj;
  //     });

  //     setChartData(updatedChartList);
  //   }; // Prevents update of chart data if no data is displayed
  // };

  //

  return (
    <main className="main flex-grow sm:pt-4">
      <div className='container mx-auto sm:rounded-lg sm:drop-shadow-md'>

        <div className='flex mt-5 mb-3 justify-center sm:hidden'>
          <h1 className="heading-under-header text-4xl font-extrabold leading-none tracking-tight text-light-text dark:text-white">EIA Energy Display</h1>
        </div>

        <SearchBar onStatesFilter={handleStatesFilter} stateResults={stateResults} onUpdateGraphs={handleUpdateGraphs} />
        {/* <FilterAccordion isChecked={isChecked} onIsChecked={setIsChecked} chartTypes={chartTypes} onAccordionFuelFilter={handleAccordionFuelFilter} /> */}
        <SectionHeading />
        <GraphParentContainer chartData={chartData} chartLabels={chartLabels} />
      </div>
    </main>
  );
};

export default MainContainer;