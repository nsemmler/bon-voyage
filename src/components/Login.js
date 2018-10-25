import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userLogin } from '../actions/auth.actions'
import { Row, Input, Button, Preloader } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import LoadingIcon from './LoadingIcon.js'
import '../styling/LoginSignup.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  loginUser = async (e) => {
    e.preventDefault()

    await this.props.userLogin(this.state, this.props.history)
  }

  render() {
    return (
      <div className="login-container">
        {
          this.props.isLoading ? <LoadingIcon /> : <Row className="login-form">
            <form onSubmit={ this.loginUser }>
              <h5 className="form-header">Login</h5>
              <Input s={12} placeholder="sample@email.com" label="Email" type="email"
                error={ this.props.showLoginError ? "Invalid email" : null }
                defaultValue={ this.state.email }
                onChange={ (e) => this.setState({ email: e.target.value }) } autoFocus />
              <Input s={12} placeholder="password" label="Password" type="password"
                error={ this.props.showLoginError ? "Invalid password" : null }
                defaultValue={ this.state.password }
                onChange={ (e) => this.setState({ password: e.target.value }) } />
              <div className="login-btn-div"><Button waves="light" type="submit">Submit</Button></div>
              <div className="login-signup-redirect"><a href="/signup" className="form-redirect">Signup Here</a></div>
            </form>
          </Row>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { showLoginError: state.auth.showLoginError, isLoggedIn: state.auth.isLoggedIn, isLoading: state.auth.isLoading }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ userLogin }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
