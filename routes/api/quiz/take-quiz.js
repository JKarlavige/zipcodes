const Quiz = require('../../../models/Quiz')
const validateQuizInput = require('../../../validation/quiz')

// @route  POST api/quiz/:quiz_id
// @desc   Take quiz
// @access Private
module.exports = (req, res) => {
  // const { errors, isValid } = validateQuizInput(req.body)
  // // Check Validation
  // if(!isValid) { return res.status(400).json(errors) }

  // Get Quiz Fields
  const questionFields = {}
  if(req.body.question) questionFields.question = req.body.question
  if(req.body.userAnswer)  questionFields.userAnswer = req.body.userAnswer
  if(req.body.correct) questionFields.correct = req.body.correct

  Quiz.findById( req.params.quiz_id )
    .then(quiz => {
      if(!quiz) {
        errors.noQuiz = 'Unable to find quiz.'
      } else {
        quiz.questions.unshift(questionFields)
        quiz.save().then(answer => {
          res.json(answer)
        })
      }
    })
}