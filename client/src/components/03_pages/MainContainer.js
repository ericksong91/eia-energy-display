import { useState } from 'react';
import fetchData from '../01_helpers/fetchData';
import SectionHeading from './SectionHeading';
import GraphParentContainer from './GraphParentContainer';
import SearchBar from './search/SearchBar';

const resource = fetchData('/states');

function MainContainer() {
  const energyData = resource.read();
  const chartDataLabel = ["CO2", "SO2", "NOx", "Net Gen.", "Avg. Price"];
  const chartTypes = ["State Emissions", "State Net Generation", "State Average Retail Price"];
  const states = energyData.filter((data) => {
    return {
      name: data.name,
      abbreviation: data.abbrev,
    };
  })
  const unitTypes = {
    co2: "kmt (CO2)",
    so2: "mt (SO2, NOx)",
    nox: "mt",
    net_generation: "thousand megawatt hours (kMWh)",
    avg_price: "¢s per kilowatt hours (¢/KWh)",
  };
  const [chartData, setChartData] = useState({});
  const [stateResults, setStateResults] = useState(states);

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
          };
        case "netGenDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Total Net Generation`,
          };
        case "avgPriceDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Average Retail Price`,
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

  return (
    <main className="main flex-grow sm:pt-4">
      <div className='container mx-auto sm:rounded-lg sm:drop-shadow-md'>
        <h1 className="description-title font-medium text-center text-xl mb-2 md:mt-2 md:mb-5 md:text-2xl lg:mt-4 lg:mb-10 lg:text-4xl hidden sm:block">Welcome to EIA Energy Display!</h1>
        <SearchBar onStatesFilter={handleStatesFilter} stateResults={stateResults} onUpdateGraphs={handleUpdateGraphs} />
        <SectionHeading />
        <GraphParentContainer chartData={chartData} chartTypes={chartTypes} />
      </div>
    </main>
  );
};

export default MainContainer;