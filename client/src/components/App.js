import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto';
import { useState, useEffect } from 'react';
import { Data } from "../utils/Data";
import PieChart from "../components/test/PieChart"
import BarChart from './test/BarChart';
import LineChart from './test/LineChart';
import '../css/App.css';

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

  console.log(chartData);

  if (Object.keys(chartData).length === 0) {
    return (<div></div>)
  }

  return (
    <div className="App">
      <h1>Test</h1>
      <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
      <LineChart chartData={chartData} />
    </div>
  );
}

export default App;
