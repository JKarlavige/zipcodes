import { IS_LOADING, CREATE_QUIZ, TAKE_QUIZ, CLEAR_QUIZ } from '../actions/types'

const initialState = {
  quiz: {},
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true
      }
    case CREATE_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        loading: false
      }
    case TAKE_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        loading: false
      }
    case CLEAR_QUIZ:
      return {
        ...state,
        quiz: {},
        loading: false
      }
    default: 
      return state
  }
}