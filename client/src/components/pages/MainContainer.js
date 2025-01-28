import { useState, useEffect } from 'react';
import fetchData from '../helpers/fetchData';
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
  const [chartData, setChartData] = useState({});
  const [chartLabels, setChartLabels] = useState({});
  const [stateResults, setStateResults] = useState(states);
  const emissions = resource.read();
  // const [fuelSelector, setFuelSelector] = useState([]); // Have the ability to filter by fuels

  function handleUpdateGraphs(searchResult) {
    //Need to load logic in here that updates graphs when user clicks on stuff in the accordion
    const stateData = emissions.filter((data) => data.name === searchResult).map((d) => d.periods)[0]; // Use searchResult prop to filter emissions data from backend
    const dataLabel = stateData.filter((data) => data.fuel_id === 1).map((d) => d.year); // Same as above but using it to find data labels
    const emissionType = ["co2", "so2", "nox"]
    const fueltype = "Fuel 1"

    const newDataSets = emissionType.map((emissionType) => {
      const emissionDataObj = {
        label: `${searchResult}'s ${fueltype}'s ${emissionType.toUpperCase()} Emissions from 1990 to 2023`,
        data: stateData.filter((data) => data.fuel_id === 1).map((d) => d[emissionType]),
        yAxisID: 'y'
      }
      return emissionDataObj
    }); // Load each dataset into objects in an array

    const dataObj = {
      labels: dataLabel,
      datasets: newDataSets
    }; // Load datasets into chart as datasets and load X-axis label with Labels

    const chartLabels = {
      title: searchResult,
      description: `${searchResult}'s CO2 Emissions from Coal`,
      units: `Placeholder Units`
    }; // Object with title, description, and units to be destructured down in the LineChart component

    setChartData(dataObj);
    setChartLabels(chartLabels);
  };

  function handleStatesFilter(value) {
    const result = states.filter((state) => {
      return state.name.toLowerCase().includes(value.toLowerCase()) || state.abbreviation.toLowerCase().includes(value.toLowerCase())
    });

    setStateResults(result);
  };

  return (
    <main className="main p-4 m-4 bg-white bg-opacity-80 rounded-lg drop-shadow-md dark:bg-slate-400">
      <SearchBar onStatesFilter={handleStatesFilter} stateResults={stateResults} onUpdateGraphs={handleUpdateGraphs} />
      <FilterAccordion />
      <GraphParentContainer chartData={chartData} chartLabels={chartLabels} />
    </main>
  );
};

export default MainContainer;