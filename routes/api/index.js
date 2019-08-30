const express = require('express');
const router = express.Router();

// Get routes
const users = require('./users');
const sort = require('./sort');
const belts = require('./belts');
const quiz = require('./quiz');

// Use routes
router.use('/users', users);
router.use('/sort', sort);
router.use('/belts', belts);
router.use('/quiz', quiz);

module.exports = router;
