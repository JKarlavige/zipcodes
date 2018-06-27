const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateBeltInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data.belt = !isEmpty(data.belt) ? data.belt : ''

  // Check if id field is empty
  if(validator.isEmpty(data.belt)) {
    errors.belt = 'Belt field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}