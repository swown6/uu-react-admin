import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import store from './redux'
import { Provider } from 'react-redux'

import './assets/index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
