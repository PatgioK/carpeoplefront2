import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './features/navbar';
import People from './features/people/people';


export const sleep = (ms:number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = memo(function() {
  return (
    <div className="App container">
      <h1>Car Ownership App</h1>
      {/* <NavBar /> */}
      {/* <Outlet /> */}
      
      <People />
    </div>
  );
})

export default App;
