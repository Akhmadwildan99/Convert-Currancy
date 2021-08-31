import React, { useEffect } from 'react';
import CurrancyRow from './CurrancyRow';
import './App.css';

function App() {

  const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=4900b5b2ae74e2b84838c3446afe49ad&format'
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])
  return (
    <>
      <h1>Convert</h1>
      <CurrancyRow />
      <div className="equels" >=</div>
      <CurrancyRow />
    </>
  );
}

export default App;
