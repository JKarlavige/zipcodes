const quiz = require('express').Router()

const keys = require('../../../config/keys')
const passport = require('passport')

// Get Routes
const createQuiz = require('./create-quiz')
const takeQuiz = require('./take-quiz')

// Use Routes
quiz.post('/create-quiz', passport.authenticate('jwt', keys.jwtSession), createQuiz)
quiz.post('/take-quiz/:quiz_id', passport.authenticate('jwt', keys.jwtSession), takeQuiz)

module.exports = quiz