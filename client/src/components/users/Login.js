import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../form-fields/InputField'
import './Users.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { loginUser } from '../../actions/userActions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.history.push('/training')
    } 
  }

  componentDidUpdate(prevProps) {
    if(this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors })
    }
    if(this.props.user.isAuthenticated !== prevProps.user.isAuthenticated) {
      this.props.history.push('/training')
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    return (
      <section className="container login">
        <h1>Login</h1>
        <div className="eight columns offset-by-two auth-contain">

          <form onSubmit={this.onSubmit}>
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
            <input className="button-primary" type="submit" value="Login" />
            <hr />
            <p>Don't have an account? | <Link to="/register" id="login-btn">Register</Link></p>
          </form>
        </div>
      </section>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)