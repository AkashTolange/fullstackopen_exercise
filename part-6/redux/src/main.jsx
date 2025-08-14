import { StrictMode } from 'react'
// import './index.css'
// import App from './App.jsx'
// import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'
import { createStore } from "redux";

const counterReducer = (state = 100, action) => {
  console.log("action is : ", action);
  console.log("state is :",state);
  if ( action.type === "ADD"){ 
    const newState = state + 1;
    return newState;

  }
  if ( action.type === "SUBTRACT"){ 
    const subState = state - 1;
    return subState;
  }
  if ( action.type === "ZERO"){ 
    const state =0;
    return state;
  }
  return state;
}

const store = createStore(counterReducer);

const App =() => { 
  // const [counter, setCounter] = useState(0);

  const addCounter =() => {
    // setCounter((count) => count + 1);
    store.dispatch({type: "ADD"})
  }
  const subtractCounter =() => { 
    // setCounter((count) => count - 1);
    store.dispatch({type: "SUBTRACT"})
  }
  const makeZero =() => { 
    // setCounter(0);
    store.dispatch({type: "ZERO"})
  }
  return ( 
    <div>
      {/* <div className="">{counter}</div> */}
      <div>{store.getState()}</div>
      <button className="" onClick={addCounter}>add</button>
      <button className="" onClick={subtractCounter}>subtract</button>
      <button className="" onClick={makeZero}>zero</button>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
store.subscribe(() => { 
  return ( 
    root.render(<App/>)
  )
});

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
