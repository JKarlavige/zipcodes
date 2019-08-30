import { IS_LOADING, GET_BELTS } from '../actions/types'

const initialState = {
  belts: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case IS_LOADING:
      return {
        ...state,
      }
    case GET_BELTS:
      return {
        ...state,
        belts: action.payload,
      }
    default: 
      return state
  }
}