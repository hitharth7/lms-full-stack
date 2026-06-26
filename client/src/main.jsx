import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <App />
      <ToastContainer position="top-right" autoClose={2500} newestOnTop closeOnClick pauseOnHover theme="light" />
    </AppContextProvider>
  </StrictMode>,
)
