// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

let container = document.getElementById("root");
let root = createRoot(container);
root.render(<App/>);
