const mongoose = require('mongoose')

const QuizSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  questions: [
    {
      question: {
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: true,
        },
        serviceLevel:  {
          type: String,
          required: true,
        }
      },
      userAnswer: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        default: false
      }
    }
  ],
})

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz