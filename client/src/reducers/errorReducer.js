import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {}

// Takes in initialState, and action
// Dispatch actions to this reducer, action is object which includes type
// Switch used for testing action
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return action.payload
    case CLEAR_ERRORS:
      return {}
    default:
      return state
  }
}