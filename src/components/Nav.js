import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'
import { createHashHistory } from 'history'
import { withRouter, Link } from 'react-router-dom'
import '../styling/Nav.css'
import { goToFavorites, goToQuiz } from './Main'

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
                <button className="workshift-navitem" onClick={ () => this.props.goToFavorites() }>Favorites</button>
                <button className="workshift-navitem" onClick={ () => this.props.goToQuiz() }>Quiz</button>
                <button className="workshift-navitem" onClick={ this.logoutUser }>Logout</button>
              </div>
              :
              <div>
                <button className="workshift-navitem"><Link className="navlink" to="/login">Login</Link></button>
                <button className="workshift-navitem"><Link className="navlink" to="/signup">Signup</Link></button>
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
