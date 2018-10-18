import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Nav from './components/Nav'
import Favorites from './components/Favorites'
import Quiz from './components/Quiz'
import Recommendations from './components/Recommendations'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

export default function App () {
  return (
    <div className="App">
      <Router>
        <div className="main-container">
          <Nav />
          <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/signup" component={ Signup } />
            <PrivateRoute exact path="/favorites" component={ Favorites } />
            <PrivateRoute exact path="/quiz" component={ Quiz } />
            <PrivateRoute exact path="/recommendations" component={ Recommendations } />
            <Redirect to="/favorites" />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
