import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setUserToken from '../helpers/setUserToken'

// Types
import { SET_CURRENT_USER, GET_ERRORS } from './types'

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Login user
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // Save token to local storage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setUserToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
} 

// Sets current logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken')
  // Remove Auth header
  setUserToken(false)
  // Empty current user
  dispatch(setCurrentUser({}))
}