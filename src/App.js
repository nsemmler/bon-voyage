import React from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import UserProfile from './components/UserProfile'
import Nav from './components/Nav'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

export const App = () => {
  return (
    <div>
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/login" component={ LoginForm } />
          <Route exact path="/signup" component={ SignupForm } />
          <Route exact path="/profile" component={ UserProfile } />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
