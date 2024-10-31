import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import { useState, useEffect, Suspense, lazy } from 'react';
import Home from './Home';
import '../css/App.css';

const PieChart = lazy(() => import("../components/graphs/PieChart"));
const BarChart = lazy(() => import("../components/graphs/BarChart"));
const LineChart = lazy(() => import("../components/graphs/LineChart"));

Chart.register(CategoryScale);

function App() {
  const [chartData, setChartData] = useState({});
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   fetch('https://api.eia.gov/v2/co2-emissions/co2-emissions-aggregates/data/?frequency=annual&data[0]=value&facets[stateId][]=MD&facets[sectorId][]=TT&facets[fuelId][]=TO&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000' + '&api_key=' + process.env.REACT_APP_API_KEY)
  //     .then(r => {
  //       if (r.ok) {
  //         r.json().then((d) => {
  //           const data = d.response.data
  //           const newObj = {
  //             labels: data.map((d) => parseInt(d.period)),
  //             datasets: [
  //               {
  //                 label: "Million Metric Tons",
  //                 data: data.map((d) => parseInt(d.value)),
  //                 backgroundColor: [
  //                   "rgba(75,192,192,1)",
  //                   "#ecf0f1",
  //                   "#50AF95",
  //                   "#f3ba2f",
  //                   "#2a71d0"
  //                 ],
  //                 borderColor: "black",
  //                 borderWidth: 2
  //               }
  //             ]
  //           }
  //           setChartData(newObj)
  //         });
  //       } else {
  //         r.json().then((e) => setErrors(e))
  //       }
  //     })
  // }, [])

  useEffect(() => setChartData({}), [])

  if (Object.keys(chartData).length === 0) {
    return(<div>WE ARE LOADING</div>)
  }

  return (
    <div className="App">
      <h1>Test</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
        <BarChart chartData={chartData} />
        <LineChart chartData={chartData} />
        <PieChart chartData={chartData} />
      </Suspense>
    </div>
  );
}

export default App;
