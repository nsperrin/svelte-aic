import React, { useState } from 'react';
import './App.css';
import CounterButton from './CounterButton';
import CounterDisplay from './CounterDisplay';

function App() {
  let [counter, setCounter] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <>
      <CounterButton onClick={increaseCounter} buttonText={'Increase'}></CounterButton>
      <CounterButton onClick={decreaseCounter} buttonText={'Decrease'}></CounterButton>
      <CounterDisplay text={counter}></CounterDisplay>
    </>
  );
}

export default App;
