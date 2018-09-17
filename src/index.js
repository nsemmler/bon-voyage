import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={ store() }>
    <Router>
      <Switch>
        <Route path="/" component={ App } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
