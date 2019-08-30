const sort = require('express').Router()
const keys = require('../../../config/keys')
const passport = require('passport')

// Get Routes
const getSort = require('./get-sort')
const updateSort = require('./update-sort')
const bulkSort = require('./bulk-update-sort')

// Use Routes
sort.get('/', getSort)
sort.post('/add-sort', passport.authenticate('jwt', keys.jwtSession), updateSort)
sort.post('/bulk-sort', bulkSort)

module.exports = sort