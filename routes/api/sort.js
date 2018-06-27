// Import packages
const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const passport = require('passport')

// Load User Model
const Sort = require('../../models/Sort')
const Belt = require('../../models/Belt')

// Load Input Validation
const validateSortInput = require('../../validation/sort')
const validateAddSortInput = require('../../validation/add-sort')

// Load Helpers
const arrayMatch = require('../../helpers/arrayMatch')

// @route  POST api/sort/
// @desc   Get sort information from provided zipcode
// @access Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateSortInput(req.body)
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  // Reduce zipcode to first 3 digits
  const zipcode = req.body.zipcode.slice(0, 3)

  // Provided service level - matched against sort item's service level
  const matchArray = []
  matchArray.push(req.body.serviceLevel)

  // Get sort information for zipcode
  Sort.find({ zipcode })
    .then(zip => {
      // Loop through each match in database from provided zipcode entry
      for(i = 0; i < zip.length; i++) {
        if(arrayMatch(matchArray, zip[i].serviceLevel)) {
          // Get correct belt and outbound destination for zipcode
          Belt.findOne({ "destinations._id": zip[i].destinationId })
          .then(belt => {
            const correctBelt = belt.belt
            for(b = 0; b < belt.destinations.length; b++) {
              // If entered zipcode matches destination - return correct belt & destination
              if(zip[i].destinationId === belt.destinations[b]._id) {
                res.json({
                  belt: correctBelt,
                  destination: belt.destinations[b]
                })
              }
            }
          })
          break
        }
      }
    })
})

// @route  POST api/sort/add-sort
// @desc   Add zipcode to sort or edit existing sort
// @access Private
router.post('/add-sort', passport.authenticate('jwt', keys.jwtSession), (req, res) => {
  const { errors, isValid } = validateAddSortInput(req.body)
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  // Gather input fields
  const planFields = {}
  if(req.body.zipcode) planFields.zipcode = req.body.zipcode
  if(req.body.destinationId) planFields.destinationId = req.body.destinationId
  if (typeof req.body.serviceLevel !== 'undefined') {
    planFields.serviceLevel = req.body.serviceLevel.split(',');
  }

  // Check if zipcode exists in sort plan
  Sort.find({ zipcode: req.body.zipcode })
    .then(sort => {
      if(sort) {
        // Loop through each match in database from provided zipcode entry
        for(i = 0; i < sort.length; i++) {
          // Check if destination matches - if so update sort item
          if(planFields.destinationId === sort[i].destinationId) {
            // Update sort
            Sort.findOneAndUpdate(
              { _id: sort[i].id },
              {$set: planFields },
              { new: true }
            ).then(updatedSort => res.json(updatedSort))
          } else {
            // Create new sort item with new destination ID
            new Sort(planFields).save()
            .then(planFields => res.json(planFields))
            .catch(err => res.status(400).json(err))
            // End for loop
            break
          }
        }
      } else {
        // If zipcode not in database, create new sort item
        new Sort(planFields).save()
        .then(planFields => res.json(planFields))
        .catch(err => res.status(400).json(err))
      }
    })
})



module.exports = router