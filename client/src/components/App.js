import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Data, EIAData } from "../utils/Data";
import EIAAPIFetchTest from './test/EIAAPIFetchTest';
import '../css/App.css';

const PieChart = lazy(() => import("../components/test/PieChart"));
const BarChart = lazy(() => import("../components/test/BarChart"));
const LineChart = lazy(() => import("../components/test/LineChart"));

Chart.register(CategoryScale);

function App() {
  const testArr = EIAData.map((data) => data.response.data)
  const [chartData, setChartData] = useState({});
  // const testArr2 = testArr[0].map((d) => d.period)

  // console.log(testArr2)

  useEffect(() => {
    const newObj = {
      labels: testArr[0].map((data) => parseInt(data.period)),
      datasets: [
        {
          label: "Million Metric Tons",
          data: testArr[0].map((data) => parseInt(data.value)),
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
        <EIAAPIFetchTest />
        <BarChart chartData={chartData} />
        <LineChart chartData={chartData} />
        <PieChart chartData={chartData} />
      </Suspense>
    </div>
  );
}

export default App;
