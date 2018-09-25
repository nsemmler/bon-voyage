import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'
import { createHashHistory } from 'history'
import { withRouter } from 'react-router-dom'

export const history = createHashHistory()

function mapStateToProps (state) {
  return { user: state.user, isLoggedIn: state.auth.isLoggedIn }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ userLogout }, dispatch)
}

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  logoutUser = async (e) => {
    e.preventDefault()

    await this.props.userLogout()
    this.props.history.push("/login")
  }

  displayLogoutOrLoginSignupBtns = () => {
    return (
      <Navbar brand="Bon Voyage" right>
        {
          this.props.isLoggedIn ?
            <NavItem onClick={ this.logoutUser } href="/logout">Logout</NavItem>
            :
            <div>
              <NavItem onClick={ this.props.redirectToLogin } href="/login">Login</NavItem>
              <NavItem onClick={ this.props.redirectToSignup } href="/signup">Signup</NavItem>
            </div>
        }
      </Navbar>
    )
  }

  render() {
    return (
      <div>
        {
          this.displayLogoutOrLoginSignupBtns()
        }
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
