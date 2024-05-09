import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Greeting from './Greeting.jsx'
import FavoriteFoodLine from './FavoriteFood.jsx'
import { TestTitle } from './TestTitle.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestTitle/>
    <Greeting />
    <FavoriteFoodLine />
  </React.StrictMode>,
)
