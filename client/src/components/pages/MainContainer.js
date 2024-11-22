import React from 'react'
import FilterAccordion from './FilterAccordion';
import GraphParentContainer from './GraphParentContainer';

function MainContainer({ chartData }) {

  // Search Logic up here with state management of Graph Parent Card
  // Maybe a bunch of cards to pick a state?

  return (
    <main className="main p-4 m-4 bg-white bg-opacity-80 rounded-lg drop-shadow-md">
      <FilterAccordion />
      <GraphParentContainer chartData={chartData} />
    </main>
  )
};

export default MainContainer;