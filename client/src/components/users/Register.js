import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../form-fields/InputField'
import './Users.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import PropTypes from 'prop-types'

// Actions
import { registerUser } from '../../actions/userActions'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      employeeId: '',
      email: '',
      password: '',
      passwordConf: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.errors !== prevProps.errors) {
      this.setState({
        errors: prevProps.errors
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.errors !== state.errors) {
      return { errors: props.errors }
    } else {
      return null
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      username: this.state.username,
      employeeId: this.state.employeeId,
      email: this.state.email,
      password: this.state.password,
      passwordConf: this.state.passwordConf
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state
    return (
      <section className="container register">
        <h1>Register for Operational Sort Training</h1>
        <div className="eight columns offset-by-two auth-contain">

          <form onSubmit={this.onSubmit}>
            <InputField 
              label="Username"
              placeholder="Enter a username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <InputField 
              label="Employee I.D."
              placeholder="Enter your employee I.D."
              name="employeeId"
              value={this.state.employeeId}
              onChange={this.onChange}
              type="number"
              error={errors.employeeId}
            />
            <InputField 
              label="Email Address"
              placeholder="Enter an email address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              error={errors.email}
            />
            <InputField 
              label="Password"
              placeholder="Enter a password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              error={errors.password}
            />
            <InputField 
              label="Confirm Password"
              placeholder="Please confirm your password"
              name="passwordConf"
              value={this.state.passwordConf}
              onChange={this.onChange}
              type="password"
              error={errors.passwordConf}
            />
            <input className="button-primary" type="submit" value="Register" />
            <hr />
            <p>Already have an account? | <Link to="/login" id="login-btn">Login</Link></p>
          </form>
        </div>
      </section>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))