import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userSignup } from '../actions/auth.actions'
import { Row, Input, Button, Preloader } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import '../styling/LoginSignup.css'

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
      <div className="signup-container">
        {
          this.props.isLoading ? <Preloader className="pending" /> : <Row className="signup-form">
            <form onSubmit={ this.userSignup }>
              <h5 className="form-header">Signup</h5>
              <Input s={12} placeholder="sample@email.com" label="Email" type="email"
                error={ this.props.showSignupError ? "Invalid email" : null }
                defaultValue={ this.state.email }
                onChange={ (e) => this.setState({ email: e.target.value }) } autoFocus />
              <Input s={12} placeholder="password" label="Password" type="password"
                error={ this.props.showSignupError ? "Invalid password" : null }
                defaultValue={ this.state.password }
                onChange={ (e) => this.setState({ password: e.target.value }) } />
              <div className="signup-btn-div"><Button waves="light" type="submit">Submit</Button></div>
              <div className="login-signup-redirect"><a href="/login" className="form-redirect">Already registered? Login</a></div>
            </form>
          </Row>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user, showSignupError: state.auth.showSignupError, isLoading: state.auth.isLoading }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ userSignup }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
