const Belt = require('../../../models/Belt')
const validateBeltInput = require('../../../validation/belt')

// @route  POST api/belts/
// @desc   Create or update outbound belts
// @access Private
module.exports = (req, res) => {
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
}