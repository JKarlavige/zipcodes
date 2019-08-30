import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route 
    {...rest}
    render = { props => 
      user.user.admin === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
)

AdminRoute.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {})(AdminRoute)
