import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Data } from "../utils/Data";
import '../css/App.css';

const PieChart = lazy(() => import("../components/test/PieChart"));
const BarChart = lazy(() => import("../components/test/BarChart"));
const LineChart = lazy(() => import("../components/test/LineChart"));

Chart.register(CategoryScale);

function App() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const newObj = {
      labels: Data.map((data) => data.year),
      datasets: [
        //Inserting an object 
        {
          label: "Users Gained",
          data: Data.map((data) => data.userGain),
          // Background color is an array of values for determining color
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "black",
          borderWidth: 2
        }
      ]
    }
    setChartData(newObj)
  }, [])

  // if (Object.keys(chartData).length === 0) {
  //   return (<div></div>)
  // }

  return (
    <div className="App">
      <h1>Test</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PieChart chartData={chartData} />
        <BarChart chartData={chartData} />
        <LineChart chartData={chartData} />
      </Suspense>
    </div>
  );
}

export default App;
