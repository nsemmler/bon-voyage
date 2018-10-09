import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Main from './Main'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return (
    React.createElement(component, finalProps)
  )
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route { ...rest } render={ routeProps => {
      return renderMergedProps(component, routeProps, rest)
    }} />
  )
}


export default PropsRoute