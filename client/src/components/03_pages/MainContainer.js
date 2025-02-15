import { useState } from 'react';
import fetchData from '../01_helpers/fetchData';
import SectionHeading from './SectionHeading';
import GraphParentContainer from './GraphParentContainer';
import SearchBar from './search/SearchBar';

const resource = fetchData('/states');

function MainContainer() {
  const energyData = resource.read();
  const chartDataLabel = ["CO2", "SO2", "NOx", "Net Gen.", "Avg. Price", "CO2 per MWh", "SO2 per MWh", "NOx per MWH"];
  const chartTypes = ["State Emissions", "State Net Generation", "State Average Retail Price"];
  const states = energyData.map((data) => {
    return {
      name: data.name,
      abbreviation: data.abbrev,
    };
  })

  const unitTypes = {
    co2: "kmt (CO2)",
    so2: "mt (SO2, NOx)",
    nox: "mt",
    net_generation: "thousand megawatt hour (kMWh)",
    avg_price: "cents per kilowatt hour (¢/KWh)",
    co2_per_mwh: "pounds per megawatt hour (lbs/mwh)",
    so2_per_mwh: "pounds per megawatt hour (lbs/mwh)",
    nox_per_mwh: "pounds per megawatt hour (lbs/mwh)",
  };

  const categoryType = {
    co2: "emissions",
    so2: "emissions",
    nox: "emissions",
    net_generation: "net_generation",
    avg_price: "avg_price",
    co2_per_mwh: "CO2_emissions_per_mwh",
    so2_per_mwh: "SO2_emissions_per_mwh",
    nox_per_mwh: "NOx_emissions_per_mwh",
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
        yAxisID: categoryType[dataType] === "emissions" || categoryType[dataType] === "net_generation" || categoryType[dataType] === "avg_price" ? "y" : "y1",
        units: unitTypes[dataType],
        dataCategory: categoryType[dataType],
      } // Only co2 is changed to a different axis due to scale
      
      return dataObj;
    }); // Gives an array with all data

    console.log(dataPointSet)


    const dataSetsObj = makeDataObjects(dataPointSet); // Groups converted data (ie, [emissions], [net generation], etc) into one object with accessible keys

    return sortDataObjects(dataSetsObj, xAxisLabels)
  };

  function makeDataObjects(dataPointSet) {
    // Groups converted data into specific chart datasets (ie, emissions, net generation, etc)
    // Returns Object with datasets
    const emissionsData = [];
    const netGenData = [];
    const avgPriceData = [];
    const CO2emissionsPerMWh = [];
    const SO2emissionsPerMWh = [];
    const NOxemissionsPerMWh = [];

    for (let i = 0; i < dataPointSet.length; i++) {
      if (dataPointSet[i].dataCategory === "emissions") emissionsData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "net_generation") netGenData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "avg_price") avgPriceData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "CO2_emissions_per_mwh" || dataPointSet[i].dataCategory === "net_generation") CO2emissionsPerMWh.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "SO2_emissions_per_mwh" || dataPointSet[i].dataCategory === "net_generation") SO2emissionsPerMWh.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "NOx_emissions_per_mwh" || dataPointSet[i].dataCategory === "net_generation") NOxemissionsPerMWh.push(dataPointSet[i]);
    };

    return {
      emissionsDataSet: emissionsData,
      netGenDataSet: netGenData,
      avgPriceDataSet: avgPriceData,
      CO2emissionsPerMWhDataSet: CO2emissionsPerMWh,
      SO2emissionsPerMWhDataSet: SO2emissionsPerMWh,
      NOxemissionsPerMWhDataSet: NOxemissionsPerMWh,
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
            needsY1: false,
          };
        case "netGenDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Total Net Generation`,
            needsY1: false,
          };
        case "avgPriceDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `Average Retail Price`,
            needsY1: false,
          };
        case "CO2emissionsPerMWhDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `CO2 Emissions per MWh`,
            needsY1: true,
          };
        case "SO2emissionsPerMWhDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `SO2 Emissions per MWh`,
            needsY1: true,
          };
        case "NOxemissionsPerMWhDataSet":
          return {
            datasets: dataSetsObj[key],
            labels: xAxisLabels,
            description: `NOx Emissions per MWh`,
            needsY1: true,
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
        <SectionHeading />
        <SearchBar onStatesFilter={handleStatesFilter} stateResults={stateResults} onUpdateGraphs={handleUpdateGraphs} />
        <GraphParentContainer chartData={chartData} chartTypes={chartTypes} />
      </div>
    </main>
  );
};

export default MainContainer;