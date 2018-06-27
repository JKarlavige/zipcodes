const mongoose = require('mongoose')

const SortSchema = mongoose.Schema({
  zipcode: {
    type: String,
    required: true,
  },
  serviceLevel:  {
    type: [String],
    required: true,
  },
  destinationId: {
    type: String,
    required: true,
  }
})

const Sort = mongoose.model('Sort', SortSchema)

module.exports = Sort