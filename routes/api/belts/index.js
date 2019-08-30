const belts = require('express').Router()
const keys = require('../../../config/keys')
const passport = require('passport')

// Get Routes
const allBelts = require('./all-belts')
const updateBelts = require('./update-belts')
const updateDestination = require('./update-destination')

// Use Routes
belts.get('/', allBelts)
belts.post('/', passport.authenticate('jwt', keys.jwtSession), updateBelts)
belts.post('/destination', passport.authenticate('jwt', keys.jwtSession), updateDestination)

module.exports = belts