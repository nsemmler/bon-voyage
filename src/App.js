import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './components/Main'
import Nav from './components/Nav'
import PrivateRoute from './components/PrivateRoute'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

require('dotenv').config()

export default function App () {
  return (
    <div id="main">
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/signup" component={ Signup } />
          <PrivateRoute exact path="/" component={ Main } />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  )
}
