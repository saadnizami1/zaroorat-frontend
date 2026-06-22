import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/Theme.css'
import './utils/axios.js' // installs the global 401 auto-logout interceptor
import App from './App.jsx'
import CampaignProvider from './store/campaignStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CampaignProvider>
      <App />
    </CampaignProvider>
  </StrictMode>,
)
