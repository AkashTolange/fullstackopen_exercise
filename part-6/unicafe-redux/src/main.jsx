import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
// import reducer from './reducer'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const App =() => { 
  return ( 
    <div>
      <h2>Give Feedback ok </h2>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>

      <h2>Statistics</h2>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  root.render(<App/>)
  
}

renderApp()
store.subscribe(renderApp)
