const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateAddSortInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : ''
  data.serviceLevel = !isEmpty(data.serviceLevel) ? data.serviceLevel : ''
  data.destinationId = !isEmpty(data.destinationId) ? data.destinationId : ''

  // Check if zipcode field is empty
  if(validator.isEmpty(data.zipcode)) {
    errors.zipcode = 'Zipcode field is required'
  }
  // Check if service level field is empty
  if(validator.isEmpty(data.serviceLevel)) {
    errors.serviceLevel = 'Service level is required'
  }
  // Check if destination field is empty
  if(validator.isEmpty(data.destinationId)) {
    errors.destinationId = 'Destination is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}