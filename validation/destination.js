const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateDestinationInput(data) {
  let errors = {}

  // If name field is empty, set to empty string 
  // (allows validator.isEmpty to test for empty string)
  data._id = !isEmpty(data._id) ? data._id : ''
  data.destination = !isEmpty(data.destination) ? data.destination : ''
  data.slic = !isEmpty(data.slic) ? data.slic : ''

  // Check if id field is empty
  if(validator.isEmpty(data._id)) {
    errors._id = 'ID field is required'
  }
  // Check if destination field is empty
  if(validator.isEmpty(data.destination)) {
    errors.destination = 'Destination field is required'
  }
  // Check if slic field is empty
  if(validator.isEmpty(data.slic)) {
    errors.slic = 'Slic field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}