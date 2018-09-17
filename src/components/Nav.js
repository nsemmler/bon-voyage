import React, { Component } from 'react'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'

function mapStateToProps (state) {
  return { user: state.auth.user }
}

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  logoutUser = async () => {
    await userLogout()
    this.props.history.push("/login")
  }

  render() {
    return (
      <Navbar brand="Bon Voyage" right>
        <NavItem onClick={ this.props.redirectToLogin } href="/login">Login</NavItem>
        <NavItem onClick={ this.props.redirectToSignup } href="/signup">Signup</NavItem>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps, null)(Nav)
