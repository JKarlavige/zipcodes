const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // Check if email field is email
  if(!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  // Check if email field is empty
  if(validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }
  // Check if password field is empty
  if(validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}