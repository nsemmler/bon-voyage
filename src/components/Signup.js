import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userSignup } from '../actions/auth.actions'
import { Row, Input, Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'

export class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  userSignup = (e) => {
    e.preventDefault()
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      this.props.userSignup(this.state)
      this.props.history.push("/login")
      this.setState({
        email: "",
        password: ""
      })
    }
  }

  render() {
    return (
      <div className="main">
        <Nav />
        <Row className="signup-form">
          <form onSubmit={ this.userSignup }>
            <h5 className="form-header">Signup</h5>
            <Input s={12} placeholder="sample@email.com" label="Email" type="email"
              error={ this.props.showSignupError ? "Invalid email" : null }
              value={ this.state.email }
              onChange={ (e) => this.setState({ email: e.target.value }) } />
            <Input s={12} placeholder="password" label="Password"
              error={ this.props.showSignupError ? "Invalid password" : null }
              value={ this.state.password }
              onChange={ (e) => this.setState({ password: e.target.value }) } />
            <div><Button waves="light" type="submit">Submit</Button></div>
            <div><a onClick={ this.props.redirectToLogin } href="/login" className="form-redirect">Already registered? Login</a></div>
          </form>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user, showSignupError: state.auth.showSignupError }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ userSignup }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
