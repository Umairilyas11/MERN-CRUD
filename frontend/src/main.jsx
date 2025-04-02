
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from './components/ui/Provider.jsx';
import {  Toaster } from './components/ui/toaster.jsx';




createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
    <BrowserRouter>
     <Provider>
      <Toaster />
      <App />
    </Provider>
    
    </BrowserRouter>
    
  </StrictMode>
  
)
