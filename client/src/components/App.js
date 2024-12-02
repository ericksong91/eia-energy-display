import { useState, useEffect, Suspense } from 'react';
import MainContainer from './pages/MainContainer';
import Header from './header/Header';
import Footer from './footer/Footer';

function App() {
  const [emissions, setEmissions] = useState([]);
  const [chartData, setChartData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  // const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch('/states')
      .then(r => {
        if (r.ok) {
          r.json().then(data => setEmissions(data))
        } else {
          r.json().then(error => alert(error.errors))
        }
      })
  }, []);


  // Get Data Back First from API, use search terms from user
  useEffect(() => {
    // Maryland data
    if (emissions.length === 0) {
      setChartData({});
    } else {
      const stateData = emissions.filter((data) => data.abbrev === "MD").map((d) => d.periods)[0]
      const dataLabel = stateData.filter((data) => data.fuel_id === 3).map((d) => d.year)
      const newDataSets = [
        {
          label: "Maryland Fuel",
          data: stateData.filter((data) => data.fuel_id === 3).map((d) => d.co2)
        }
      ];
      const dataObj = {
        labels: dataLabel,
        datasets: newDataSets
      };

      setChartData(dataObj);
    };
  }, [emissions]);

  if (Object.keys(chartData).length === 0) {
    return (<div>Loading...</div>)
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* <div className="app min-h-screen bg-gradient-to-b from-blue-100 to-lime-200 dark:bg-slate-800 dark:bg-none"> */}
      <div className="app flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-lime-200 dark:bg-slate-800 dark:bg-none">
        <Suspense fallback={<div>Loading...</div>}> {/** check out what suspense does */}
          <Header onDarkMode={setDarkMode} darkMode={darkMode} />
          <MainContainer chartData={chartData} />
          <Footer />
        </Suspense>
      </div >
    </div>
  );
};

export default App;

/* EXAMPLE FOR LOADING CHART DATA */

// const [chartData, setChartData] = useState({
//   labels: Data.filter((data) => {
//     if(data["fuelid"] === "OTH"){
//       return data
//     }
//   }).map((data) => parseInt(data.period)),
//   datasets: [
//     {
//       label: "Other Fuel Source CO2 Emissions",
//       data: Data.filter((data) => {
//         if (data["fuelid"] === "OTH") {
//           return data
//         }
//       }).map((d) => d['co2-thousand-metric-tons'])
//     }
//   ]
// });
// const [errors, setErrors] = useState([]);

// useEffect(() => {
//   fetch('')
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

// useEffect(() => setChartData({}), [])
