import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
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
      <div className="nav-container">
        <nav className="nav">
          {
            (localStorage.getItem('token')) ?
              <div className="nav-items">
                <div className="logo-container">
                  <a id="logo" href="/">Bon Voyage</a>
                  <div className="logo-div" />
                </div>
                <div className="nav-links">
                  <a className="navlink" href="/favorites">Favorites</a>
                  <a className="navlink" href="/quiz">Quiz</a>
                  <a className="navlink" onClick={ this.logoutUser } href="/logout">Logout</a>
                </div>
              </div>
              :
              <div className="nav-items">
                <div className="logo-container">
                  <a id="logo" href="/">Bon Voyage</a>
                  <div className="logo-div" />
                </div>
                <div className="nav-links">
                  <a className="navlink" href="/login">Login</a>
                  <a className="navlink" href="/signup">Signup</a>
                </div>
              </div>
          }
        </nav>
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
