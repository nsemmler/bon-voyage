import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Main from './components/Main'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

export default function App () {
  return (
    <div>
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
