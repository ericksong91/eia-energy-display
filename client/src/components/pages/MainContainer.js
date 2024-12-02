import React from 'react'
import FilterAccordion from './FilterAccordion';
import GraphParentContainer from './GraphParentContainer';
import SearchBar from './SearchBar';

function MainContainer({ chartData }) {

  const title = "Maryland emissions";
  const description = "Maryland be emitting";

  // Search Logic up here with state management of Graph Parent Card
  // Maybe a bunch of cards to pick a state?

  return (
    <main className="main p-4 m-4 bg-white bg-opacity-80 rounded-lg drop-shadow-md dark:bg-slate-400">
      <SearchBar />
      <FilterAccordion />
      <GraphParentContainer chartData={chartData} title={title} description={description} />
    </main>
  );
};

export default MainContainer;