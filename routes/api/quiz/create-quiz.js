const Quiz = require('../../../models/Quiz')

// @route  POST api/quiz/create-quiz
// @desc   Create new quiz
// @access Private
module.exports = (req, res) => {
  new Quiz({ user: req.user.id }).save()
    .then(quiz => {
      res.json(quiz)
    })
}