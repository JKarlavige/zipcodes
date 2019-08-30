import { combineReducers } from 'redux'
import userReducer from './userReducer'
import trainingReducer from './trainingReducer'
import beltReducer from './beltReducer'
import sortReducer from './sortReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  user: userReducer,
  training: trainingReducer,
  belts: beltReducer,
  sort: sortReducer,
  errors: errorReducer
})