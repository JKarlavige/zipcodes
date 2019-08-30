const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data.username = !isEmpty(data.username) ? data.username : ''
  data.employeeId = !isEmpty(data.employeeId) ? data.employeeId : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.passwordConf = !isEmpty(data.passwordConf) ? data.passwordConf : ''

  // Check if username between 2 & 30 characters
  if(!validator.isLength(data.username, {min: 2, max: 30})) {
    errors.username = 'Username must be between 2 and 30 characters.'
  }
  // Check if username field is empty
  if(validator.isEmpty(data.username)) {
    errors.username = 'Username field is required'
  }

  // Check if employeeId field is empty
  if(validator.isEmpty(data.employeeId)) {
    errors.employeeId = 'Employee ID field is required'
  }

  // Check if email field is empty
  if(validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }
  // Check if email field is email
  if(!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Check if password field is empty
  if(validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }
  // Check if password is between 6 & 30 characters
  if(!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters.'
  }

   // Check if confirm password field is empty
  if(validator.isEmpty(data.passwordConf)) {
    errors.passwordConf = 'Password confirm field is required'
  }
   // Check if password is equal to confirm password
  if(!validator.equals(data.password, data.passwordConf)) {
    errors.passwordConf = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}