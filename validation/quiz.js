const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateQuizInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data.question = !isEmpty(data.question) ? data.question : ''

  // Check if user field is empty
  if(validator.isEmpty(data.question)) {
    errors.question = 'Question is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}