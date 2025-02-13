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
  const chartDataLabel = ["CO2", "SO2", "NOx", "Net Gen.", "Avg. Price"];
  const chartTypes = ["State Emissions", "State Net Generation", "State Average Retail Price"];
  const [chartData, setChartData] = useState({});
  const [stateResults, setStateResults] = useState(states);
  const [isCheckedArr, setIsCheckedArr] = useState(Array(chartTypes.length).fill(true));
  const unitTypes = {
    co2: "kmt (CO2)",
    so2: "mt (SO2, NOx)",
    nox: "mt",
    net_generation: "thousand megawatt hours (kMWh)",
    avg_price: "¢s per kilowatt hours (¢/KWh)",
  };

  /*

  HELPER FUNCTIONS FOR PACKAGING CHART DATA

  */

  function makeDataSets(stateData, xAxisLabels) {
    // Job for this function is to only convert stateData into individual data objects
    const dataPointSet = Object.keys(unitTypes).map((dataType, index) => {
      const dataObj = {
        label: `${chartDataLabel[index]}`,
        data: stateData.map((d) => d[dataType]),
        yAxisID: "y",
        units: unitTypes[dataType],
        dataCategory: dataType !== "net_generation" && dataType !== "avg_price" ? "emissions" : dataType,
      } // Only co2 is changed to a different axis due to scale

      return dataObj;
    }); // Gives an array with all data


    const dataSetsObj = makeDataObjects(dataPointSet); // Groups converted data (ie, [emissions], [net generation], etc) into one object with accessible keys

    return sortDataObjects(dataSetsObj, xAxisLabels)
  };

  function makeDataObjects(dataPointSet) {
    // Groups converted data into specific chart datasets (ie, emissions, net generation, etc)
    // Returns Object with datasets
    const emissionsData = [];
    const netGenData = [];
    const avgPriceData = [];

    for (let i = 0; i < dataPointSet.length; i++) {
      if (dataPointSet[i].dataCategory === "emissions") emissionsData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "net_generation") netGenData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "avg_price") avgPriceData.push(dataPointSet[i]);
    };

    return {
      emissionsDataSet: emissionsData,
      netGenDataSet: netGenData,
      avgPriceDataSet: avgPriceData,
    };
  };

  function sortDataObjects(dataSetsObj, xAxisLabels) {
    return Object.keys(dataSetsObj)?.map(key => {
      switch (key) {
        case "emissionsDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Combined Emissions`,
            isChecked: isCheckedArr[0],
          };
        case "netGenDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Total Net Generation`,
            isChecked: isCheckedArr[1],
          };
        case "avgPriceDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Average Retail Price`,
            isChecked: isCheckedArr[2],
          };
        default:
          return {};
      };
    });
  };

  /*

  FUNCTIONS THAT UPDATE CHART STATE

  */

  function handleUpdateGraphs(searchResult) {
    const stateData = energyData.filter((data) => data.name === searchResult).map((d) => d.periods)[0]; // Use searchResult prop to filter data by US State
    const xAxisLabels = stateData.map(data => data.year); // X axis corresponding data labels, used later in final object
    const combinedDataList = makeDataSets(stateData, xAxisLabels); // Return array with all data organized for chartJS

    const chartDataObj = {
      stateName: searchResult,
      labels: xAxisLabels,
      datasets: combinedDataList,
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

  function handleAccordionFuelFilter(newChecks) {
    if (Object.keys(chartData).length === 0) {
      return
    } else {
      const updatedDatasets = chartData.datasets.map((chartData, index) => {
        const newChartObj = {
          ...chartData,
          isChecked: newChecks[index],
        };
        return newChartObj;
      });

      const updatedChartData = {
        ...chartData,
        datasets: updatedDatasets
      };

      return setChartData(updatedChartData);
    }; // Prevents update of chart data if no data is displayed
  };

  //

  return (
    <main className="main flex-grow sm:pt-4">
      <div className='container mx-auto sm:rounded-lg sm:drop-shadow-md'>
        <SectionHeading />
        <SearchBar onStatesFilter={handleStatesFilter} stateResults={stateResults} onUpdateGraphs={handleUpdateGraphs} />
        <FilterAccordion isCheckedArr={isCheckedArr} onIsCheckedArr={setIsCheckedArr} chartTypes={chartTypes} onAccordionFuelFilter={handleAccordionFuelFilter} />
        <GraphParentContainer chartData={chartData} isCheckedArr={isCheckedArr} />
      </div>
    </main>
  );
};

export default MainContainer;