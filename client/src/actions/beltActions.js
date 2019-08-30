import axios from 'axios'

// Types
import { GET_BELTS, GET_ERRORS } from './types'

// Get available destinations for quiz
export const getBelts = () => dispatch => {
  axios.get('/api/belts')
    .then(res => 
      dispatch({
        type: GET_BELTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}