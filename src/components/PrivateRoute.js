import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = (localStorage.getItem('token')) ? true : false

  return (
    <Route render={ props =>
      isLoggedIn ? ( <Component { ...props } { ...rest } /> ) : ( <Redirect to={{ pathname: '/login' }} /> )
     } />
  )
}

export default PrivateRoute
