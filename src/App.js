import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './components/Main'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/signup" component={ Signup } />
        <Main />
        <Redirect to="/login" />
      </Switch>
    </Router>
  )
}
