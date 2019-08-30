const Belt = require('../../../models/Belt')
const validateDestinationInput = require('../../../validation/destination')

// @route  POST api/belts/destination/
// @desc   Create or update outbound destination
// @access Private
module.exports = (req, res) => {
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
}