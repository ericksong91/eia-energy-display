import { useState } from 'react';
import fetchData from '../01_helpers/fetchData';
import SectionHeading from './SectionHeading';
import GraphParentContainer from './GraphParentContainer';
import SearchBar from './search/SearchBar';
import { data } from 'autoprefixer';

const resource = fetchData('/states');

function MainContainer() {
  const energyData = resource.read();
  const chartTypes = ["State Emissions", "State Net Generation", "State Average Retail Price"];
  const states = energyData.map((data) => {
    return {
      name: data.name,
      abbreviation: data.abbrev,
    };
  });

  const dataCategories = {
    co2: {type: "emissions", legendLabel: "CO2", description: "Combined Emissions"},
    so2: {type: "emissions", legendLabel: "SO2", description: "Combined Emissions"},
    nox: {type: "emissions", legendLabel: "NOx", description: "Combined Emissions"},
    net_generation: {type: "net_generation", legendLabel: "Net Gen.", description: 'Total Net Generation'},
    avg_price: {type: "avg_price", legendLabel: "Avg. Price", description: 'Average Retail Price'},
    co2_per_mwh: {type: "co2_emissions_per_mwh", legendLabel: "CO2 per MWh", description: ''},
    so2_per_mwh: {type: "so2_nox_emissions_per_mwh", legendLabel: "SO2 per MWh"},
    nox_per_mwh: {type: "so2_nox_emissions_per_mwh", legendLabel: "NOx per MWH"},
  };

  const [chartData, setChartData] = useState({});
  const [stateResults, setStateResults] = useState(states);

  /*
  --HELPER FUNCTIONS FOR PACKAGING CHART DATA--
  */

  function makeDataSets(stateData, xAxisLabels) {
    // Job for this function is to only convert stateData into individual data objects
    const dataPointSet = Object.keys(dataCategories).map((category, index) => {
      const dataObj = {
        label: `${dataCategories[category].legendLabel}`,
        data: stateData.map((d) => d[category]),
        yAxisID: dataCategories[category].type === "emissions" || dataCategories[category].type === "net_generation" || dataCategories[category].type === "avg_price" ? "y" : "y1",
        dataCategory: dataCategories[category],
      };
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
    const CO2emissionsPerMWh = [];
    const SO2NOxemissionsPerMWh = [];

    for (let i = 0; i < dataPointSet.length; i++) {
      if (dataPointSet[i].dataCategory === "emissions") emissionsData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "net_generation") netGenData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "avg_price") avgPriceData.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "co2_emissions_per_mwh" || dataPointSet[i].dataCategory === "net_generation") CO2emissionsPerMWh.push(dataPointSet[i]);
      if (dataPointSet[i].dataCategory === "so2_nox_emissions_per_mwh" || dataPointSet[i].dataCategory === "net_generation") SO2NOxemissionsPerMWh.push(dataPointSet[i]);
    };

    return {
      emissionsDataSet: emissionsData,
      netGenDataSet: netGenData,
      CO2emissionsPerMWhDataSet: CO2emissionsPerMWh,
      SO2NOxemissionsPerMWhDataSet: SO2NOxemissionsPerMWh,
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