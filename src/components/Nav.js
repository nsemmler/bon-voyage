import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'
import { createHashHistory } from 'history'
import { withRouter } from 'react-router-dom'
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
                <li><NavItem to="/favorites">Favorites</NavItem></li>
                <li><NavItem to="/quiz">Take Quiz</NavItem></li>
                <li><NavItem to="/logout">Logout</NavItem></li>
              </div>
              :
              <div>
                <li><NavItem to="/login">Login</NavItem></li>
                <li><NavItem to="/signup">Signup</NavItem></li>
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
