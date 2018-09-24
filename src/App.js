import React from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Main from './components/Main'
import Nav from './components/Nav'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

export default function App () {
  return (
    <div className="main">
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/login" component={ LoginForm } />
          <Route exact path="/signup" component={ SignupForm } />
          <Main />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  )
}
