import React, { useEffect, useState } from 'react';
import CurrancyRow from './CurrancyRow';
import './App.css';

function App() {
  const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=4900b5b2ae74e2b84838c3446afe49ad'


  const [ currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRates, setExchangeRates] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  
  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRates
  } else {
    toAmount = amount
    fromAmount = amount /  exchangeRates
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([ data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRates(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if(fromCurrency !== null && toCurrency !== null) {
      fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRates(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange  (e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange  (e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false)
  }
  return (
    <>
      <h1>Convert</h1>
      <CurrancyRow 
      currencyOptions = {currencyOptions}
      selectedCurrency = {fromCurrency}
      onChangeCurrency = {e => setFromCurrency(e.target.value)}
      onChangAmount={handleFromAmountChange}
      amount={fromAmount}
      />
      <div className="equels" >=</div>
      <CurrancyRow 
      currencyOptions = {currencyOptions} 
      selectedCurrency = {toCurrency}
      onChangeCurrency = {e => setToCurrency(e.target.value)}
      onChangAmount={handleToAmountChange}
      amount={toAmount}
      />
    </>
  );
}

export default App;
