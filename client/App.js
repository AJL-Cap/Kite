import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import Routes from './Routes'

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes />
    </Router>
  )
}
