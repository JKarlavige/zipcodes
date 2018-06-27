// Import packages
const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const passport = require('passport')

// Load User Model
const Belt = require('../../models/Belt')

// Load Input Validation
const validateBeltInput = require('../../validation/belt')
const validateDestinationInput = require('../../validation/destination')

// @route  GET api/belts/
// @desc   View belts
// @access Public
router.get('/', (req, res) => {
  Belt.find().then(belt => res.json(belt))
})

// @route  POST api/belts/
// @desc   Create or update outbound belts
// @access Private
router.post('/', passport.authenticate('jwt', keys.jwtSession), (req, res) => {
  const { errors, isValid } = validateBeltInput(req.body)
  // Check Validation
  if(!isValid) { return res.status(400).json(errors) }

  // Check if belt exists
  Belt.findOne({ belt: req.body.belt })
    .then(belt => {
      if(belt) {
        // Update sort
        errors.exists = 'This belt already exists'
        res.status(400).json(errors)
      } else {
        // Create new sort item
        const newBelt = {
          belt: req.body.belt
        }
        new Belt(newBelt).save()
        .then(belt => res.json(belt))
        .catch(err => res.status(400).json(err))
      }
    })
})

// @route  POST api/belts/destination/
// @desc   Create or update outbound destination
// @access Private
router.post('/destination', passport.authenticate('jwt', keys.jwtSession), (req, res) => {
  const { errors, isValid } = validateDestinationInput(req.body)
  // Check Validation
  if(!isValid) { return res.status(400).json(errors) }

  // Gather input fields
  const newDest = {}
  if(req.body._id) newDest._id = req.body._id
  if(req.body.destination) newDest.destination = req.body.destination
  if(req.body.slic) newDest.slic = req.body.slic
  if(req.body.belt) newDest.belt = req.body.belt

  // Check if destination exists for belt
  Belt.find({ "destinations._id": req.body._id })
    .then(checkDest => {
      if(checkDest.length > 0) {
        errors.destExists = 'Destination exists'
        res.status(400).json(errors)
      } else {
        Belt.findOne({ belt: req.body.belt })
          .then(dest => {
            dest.destinations.unshift(newDest)
            dest.save().then(addedDest => res.json(addedDest))
          })
        
      }
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router