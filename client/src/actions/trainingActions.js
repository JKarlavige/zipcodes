import axios from 'axios'
import { setLoading } from '../helpers/setLoading'

// Types
import { CREATE_QUIZ, TAKE_QUIZ, CLEAR_QUIZ, GET_ERRORS } from './types'

// Create new quiz
export const createQuiz = (userId) => dispatch => {
  dispatch(setLoading())
  axios.post('/api/quiz/create-quiz', userId)
    .then(res => 
      dispatch({
        type: CREATE_QUIZ,
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

// Take quiz
export const takeQuiz = (quizId, quizQuestion) => dispatch => {
  dispatch(setLoading())
  axios.post(`/api/quiz/take-quiz/${quizId}`, quizQuestion)
    .then(res => 
      dispatch({
        type: TAKE_QUIZ,
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

// Clear quiz from state
export const clearQuiz = () => dispatch => {
  dispatch({
    type: CLEAR_QUIZ,
    payload: {}
  })
}