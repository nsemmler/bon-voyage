import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userLogin } from '../actions/auth.actions'
import { Row, Input, Button } from 'react-materialize'

function mapStateToProps (state) {
  return { showLoginError: state.auth.showLoginError }
}

function mapDispatchToProps (dispatch) {
  return { userLogin: bindActionCreators(userLogin, dispatch) }
}

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  loginUser = (e) => {
    e.preventDefault()
    this.props.userLogin(this.state)
    if (!this.props.showLoginError) {
      this.props.history.push("/profile")
      this.setState({ email: "", password: "" })
    }
  }

  render() {
    return (
      <Row className="login-form">
        <form onSubmit={ this.loginUser }>
          <h5 className="form-header">Login</h5>
          <Input s={12} placeholder="sample@email.com" label="Email" type="email"
            error={ this.props.showLoginError ? "Invalid email" : null }
            value={ this.state.email }
            onChange={ (e) => this.setState({ email: e.target.value }) } />
          <Input s={12} placeholder="password" label="Password"
            error={ this.props.showLoginError ? "Invalid password" : null }
            value={ this.state.password }
            onChange={ (e) => this.setState({ password: e.target.value }) } />
          <div className="login-btn-div"><Button waves="light" type="submit">Submit</Button></div>
          <div><a onClick={ this.props.redirectToSignup } href="/signup" className="form-redirect">Signup Here</a></div>
        </form>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
