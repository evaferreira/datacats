import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Demo-only: seed the three auth storage keys this codebase happens to use
// so the API's length>=8 check is satisfied. A real login flow would replace
// this and ideally collapse the three keys into one.
const DEMO_TOKEN = 'demo-12345678'
if (!localStorage.getItem('token')) localStorage.setItem('token', DEMO_TOKEN)
if (!localStorage.getItem('dc_access_token')) localStorage.setItem('dc_access_token', DEMO_TOKEN)
if (!sessionStorage.getItem('authToken')) sessionStorage.setItem('authToken', DEMO_TOKEN)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
