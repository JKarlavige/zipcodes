const express = require('express')
const router = express.Router()

// Get routes
const users = require('./users')
const sort = require('./sort')
const belts = require('./belts')
const quiz = require('./quiz')

// Use routes
router.use('/api/users', users)
router.use('/api/sort', sort)
router.use('/api/belts', belts)
router.use('/api/quiz', quiz)

module.exports = router