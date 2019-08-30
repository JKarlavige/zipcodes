import { IS_LOADING, GET_SORT, CLEAR_SORT } from '../actions/types'

const initialState = {
  sort: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case IS_LOADING:
      return {
        ...state,
      }
    case GET_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case CLEAR_SORT:
      return {
        ...state,
        sort: {}
      }
    default: 
      return state
  }
}