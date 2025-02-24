import { useState, useContext } from 'react';
import SectionHeading from './SectionHeading';
import GraphParentContainer from './GraphParentContainer';
import Glossary from './Glossary';
import SearchBar from './search/SearchBar';
import { IconContext } from '../00_context/IconContext';

function MainContainer({ resource }) {
  const energyData = resource.read();
  const states = energyData.map((data) => {
    return {
      name: data.name,
      abbreviation: data.abbrev,
    };
  });
  const dataCategories = {
    co2: { type: "emissions", legendLabel: "CO2", description: "Combined Emissions", units: "kmt (CO2), mt (SO2, NOx)" },
    so2: { type: "emissions", legendLabel: "SO2", description: "Combined Emissions", units: "kmt (CO2), mt (SO2, NOx)" },
    nox: { type: "emissions", legendLabel: "NOx", description: "Combined Emissions", units: "kmt (CO2), mt (SO2, NOx)" },
    net_generation: { type: "net_generation", legendLabel: "Net Gen.", description: "Total Net Generation", units: "thousand megawatt hour (kMWh)" },
    avg_price: { type: "avg_price", legendLabel: "Avg. Price", description: "Average Retail Price", units: "cents per kilowatt hour (¢/KWh)" },
    co2_per_mwh: { type: "co2_emissions_per_mwh", legendLabel: "CO2 per MWh", description: "CO2 Emissions per MWh", units: "pounds per megawatt hour (lbs/mwh)" },
    so2_per_mwh: { type: "so2_nox_emissions_per_mwh", legendLabel: "SO2 per MWh", description: "SO2, NOx Emissions per MWh", units: "pounds per megawatt hour (lbs/mwh)" },
    nox_per_mwh: { type: "so2_nox_emissions_per_mwh", legendLabel: "NOx per MWH", description: "SO2, NOx Emissions per MWh", units: "pounds per megawatt hour (lbs/mwh)" },
  };
  const [chartData, setChartData] = useState({});
  const currentState = chartData?.stateName || null;
  const { headingRule } = useContext(IconContext);

  /*
  ---HELPER FUNCTIONS FOR PACKAGING CHART DATA---
  */

  function makeDataSets(stateData, xAxisLabels) {
    // Job for this function is to only convert stateData into individual data objects
    const dataPointArr = Object.keys(dataCategories).map((category) => {
      const dataObj = {
        name: category,
        label: `${dataCategories[category].legendLabel}`,
        data: stateData.map((d) => d[category]),
        yAxisID: dataCategories[category].type === "emissions" || dataCategories[category].type === "net_generation" || dataCategories[category].type === "avg_price" ? "y" : "y1",
        dataCategory: dataCategories[category].type,
        fill: true,
      };
      return dataObj;
    }); // Gives an array with all data

    const dataSetsObj = makeDataObjects(dataPointArr); // Groups converted data (ie, [emissions], [net generation], etc) into one object with accessible keys

    return sortDataObjects(dataSetsObj, xAxisLabels)
  };

  function makeDataObjects(dataPointArr) {
    // Groups converted data into specific chart datasets (ie, emissions, net generation, etc)
    // Returns Object with datasets
    const emissionsData = [];
    const netGenData = [];
    const avgPriceData = [];
    const CO2emissionsPerMWh = [];
    const SO2NOxemissionsPerMWh = [];

    for (let i = 0; i < dataPointArr.length; i++) {
      if (dataPointArr[i].dataCategory === "emissions") emissionsData.push(dataPointArr[i]);
      if (dataPointArr[i].dataCategory === "net_generation") netGenData.push(dataPointArr[i]);
      if (dataPointArr[i].dataCategory === "avg_price") avgPriceData.push(dataPointArr[i]);
      if (dataPointArr[i].dataCategory === "co2_emissions_per_mwh" || dataPointArr[i].dataCategory === "net_generation") CO2emissionsPerMWh.push(dataPointArr[i]);
      if (dataPointArr[i].dataCategory === "so2_nox_emissions_per_mwh" || dataPointArr[i].dataCategory === "net_generation") SO2NOxemissionsPerMWh.push(dataPointArr[i]);
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
    const dataArr = Object.keys(dataSetsObj)?.map((key) => {
      const dataset = {
        datasets: dataSetsObj[key],
        labels: xAxisLabels,
        description: dataCategories[dataSetsObj[key][0].name].description,
        units: { y: dataCategories[dataSetsObj[key][0].name].units },
        needsY1: false,
      };

      if (key === "CO2emissionsPerMWhDataSet" || key === "SO2NOxemissionsPerMWhDataSet") {
        dataset.description = dataCategories[dataSetsObj[key][1].name].description;
        dataset.units = { y: dataCategories[dataSetsObj[key][0].name].units, y1: dataCategories[dataSetsObj[key][1].name].units };
        dataset.needsY1 = true;
      };
      return dataset;
    });

    return dataArr;
  };

  /*
  ---FUNCTIONS THAT UPDATE CHART STATE---
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

  return (
    <main className="main container flex flex-col flex-grow gap-y-5 py-5 mx-auto">
      <h1 className="description-site-header font-medium text-center text-4xl animate-appear hidden sm:block">
        Welcome to EIA Energy Display!
      </h1>

      {headingRule}

      <SectionHeading />

      {headingRule}

      <SearchBar onUpdateGraphs={handleUpdateGraphs} />

      <Glossary />

      {currentState ?
        <>
          <h2 className="state-name-year text-center font-bold mt-10 md:tracking-widest text-2xl sm:text-3xl md:text-4xl animate-appear">
            {currentState} data from 2008-2023
          </h2>
          <GraphParentContainer chartData={chartData} />
          {headingRule}
        </>
        :
        null}
    </main>
  );
};

export default MainContainer;