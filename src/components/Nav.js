import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'
import { createHashHistory } from 'history'
import { withRouter, Link } from 'react-router-dom'
import '../styling/Nav.css'

export const history = createHashHistory()

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

  render() {
    return (
      <div>
        <Navbar brand="Bon Voyage" right>
          {
            (localStorage.getItem('token')) ?
              <div>
                <NavItem tag={ Link } to="/favorites">Favorites</NavItem>
                <NavItem tag={ Link } to="/quiz">Take Quiz</NavItem>
                <NavItem tag={ Link } to="/logout">Logout</NavItem>
              </div>
              :
              <div>
                <NavItem tag={ Link } to="/login">Login</NavItem>
                <NavItem tag={ Link } to="/signup">Signup</NavItem>
              </div>
          }
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { user: state.user, isLoggedIn: state.auth.isLoggedIn }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ userLogout }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
