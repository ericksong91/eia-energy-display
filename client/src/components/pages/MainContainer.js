import React from 'react'
import SearchBar from './SearchBar';
import FilterAccordion from './child/FilterAccordion';
import GraphParentContainer from './GraphParentContainer';

function MainContainer({ chartData }) {

  // Search Logic up here with state management of Graph Parent Card
  // Maybe a bunch of cards to pick a state?

  return (
    <main className="main">
      <SearchBar />
      <FilterAccordion />
      <GraphParentContainer chartData={chartData} />
    </main>
  )
};

export default MainContainer;