import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { dark } from '@clerk/themes'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider appearance={{
      baseTheme: [dark],
    }} publishableKey={publishableKey}>
      <HashRouter>
        <App />
      </HashRouter>
    </ClerkProvider>
  </React.StrictMode>,
)
