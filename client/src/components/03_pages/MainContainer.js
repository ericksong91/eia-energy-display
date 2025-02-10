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
  const chartDataTypes = ["co2", "so2", "nox", "net_generation", "avg_price"];
  const [chartData, setChartData] = useState([]);
  const [stateResults, setStateResults] = useState(states);
  const [isCheckedArr, setIsCheckedArr] = useState(Array(3).fill(true));
  const unitTypes = {
    co2: "thousand metric tons (kmt)",
    so2: "metric ton (mt)",
    nox: "metric ton (mt)",
    net_generation: "MWh",
    avg_price: "¢/KWh",
  };

  /*

  HELPER FUNCTIONS FOR PACKAGING CHART DATA

  */

  // FOR GRAPHS

  function makeDataSets(stateData) {
    const dataSets = chartDataTypes.map((dataType) => {
      const dataObj = {
        label: `${dataType.toUpperCase()} - ${unitTypes[dataType]}`,
        data: stateData.map((d) => d[dataType]),
        yAxisID: "y",
        units: unitTypes[dataType],
        isEmission: dataType !== "net_generation" && dataType !== "avg_price",
      } // Only co2 is changed to a different axis due to scale

      return dataObj;
    }); // Gives an array with all data

    return dataSets;
  };

  /*

  FUNCTIONS THAT UPDATE CHART STATE

  */

  function handleUpdateGraphs(searchResult) {
    const stateData = energyData.filter((data) => data.name === searchResult).map((d) => d.periods)[0]; // Use searchResult prop to filter data by US State
    const xAxisLabels = stateData.map(data => data.year); // X axis corresponding data labels
    const dataSets = makeDataSets(stateData); // Return array with all data organized for chartJS

    const chartDataObj = {
      stateName: searchResult,
      labels: xAxisLabels,
      datasets: dataSets,
    };

    setChartData(chartDataObj);
  };

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
        <GraphParentContainer chartData={chartData} isCheckedArr={isCheckedArr} />
      </div>
    </main>
  );
};

export default MainContainer;