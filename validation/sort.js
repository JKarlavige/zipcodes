const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateSortInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data.zip = !isEmpty(data.zip) ? data.zip : ''
  data.serviceLevel = !isEmpty(data.serviceLevel) ? data.serviceLevel : ''

  // Check if zip field is empty
  if(validator.isEmpty(data.zip)) {
    errors.zip = 'Zipcode field is required'
  }
  // Check if service level field is empty
  if(validator.isEmpty(data.serviceLevel)) {
    errors.serviceLevel = 'Service level is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}