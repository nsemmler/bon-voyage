import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './components/Main'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

require('dotenv').config()

export default function App () {
  return (
    <div id="main">
      <Router>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/signup" component={ Signup } />
          <Route exact path="/quiz" component={ Main } />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  )
}
