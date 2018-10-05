import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Login from './Login'
import Main from './Main'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = (localStorage.getItem('token')) ? true : false

  return (
    <Route render={ props =>
      isLoggedIn ? ( <Main { ...props } /> ) : ( <Redirect to={{ pathname: '/login' }} /> )
     } { ...rest } />
  )
}

export default PrivateRoute
