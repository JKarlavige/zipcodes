const mongoose = require('mongoose')

const BeltSchema = mongoose.Schema({
  belt: {
    type: String,
    required: true,
  },
  destinations: [
    {
      _id: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      slic: {
        type: String,
        required: true,
      }
    }
  ]
})

const Belt = mongoose.model('Belt', BeltSchema)

module.exports = Belt