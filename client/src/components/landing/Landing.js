import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Landing.css'

class Landing extends Component {
  // If logged in - redirect to training
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.history.push('/training')
    }
  }
  render() {
    return (
      <section className="container" id="landing-contain">
        <h1>Welcome to UPS Operations Sort Training</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum quis turpis ac volutpat. Ut ligula nulla, aliquam eget congue a, aliquet in mi. Nullam tincidunt lectus velit, at faucibus tellus eleifend efficitur. Vestibulum vehicula, eros quis consequat scelerisque, orci lacus dictum purus, ut pulvinar urna elit nec erat. Nullam at nisi non lacus facilisis aliquam. Cras rutrum mi in tempus pulvinar. Fusce non elementum velit.</p>
        <h4>Please signup or login to get started.</h4>
        <ul id="landing-links">
          <li><button className="button-primary"><Link to="/register">Signup</Link></button></li>
          <li><button className="button-primary"><Link to="/login">Login</Link></button></li>
        </ul>
      </section>
    )
  }
}

Landing.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Landing)