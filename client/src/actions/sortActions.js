import axios from 'axios'

// Types
import { GET_SORT, GET_ERRORS, CLEAR_ERRORS, CLEAR_SORT } from './types'

// Get available destinations for quiz
export const checkSort = (questionSort) => dispatch => {
  dispatch(clearErrors())
  console.log('SENT TO POST', questionSort)
  axios.post('/api/sort', questionSort)
    .then(res => {
      console.log('THEN RESPONSE', res)
      dispatch({
        type: GET_SORT,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(clearSort())
      console.log('ERROR', err)
      if (err.response && err.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    })
}

// If sort not found, clear sort
export const clearSort = () => {
  return {
    type: CLEAR_SORT
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}