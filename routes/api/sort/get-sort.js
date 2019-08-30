const Sort = require('../../../models/Sort')
const Belt = require('../../../models/Belt')
const arrayMatch = require('../../../helpers/arrayMatch')
const validateSortInput = require('../../../validation/sort')

// @route  GET api/sort
// @desc   Get sort information from provided zipcode
// @access Public
module.exports = (req, res) => {
  const { errors, isValid } = validateSortInput(req.body)
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  // Reduce zipcode to first 3 digits
  const zipcode = req.body.zip.slice(0, 3)

  // Provided service level - matched against sort item's service level
  const matchArray = []
  matchArray.push(req.body.serviceLevel)

  // Get sort information for zipcode
  Sort.find({ zipcode })
    .then(zip => {
      if(zip.length === 0) {
        errors.sort = "Unable to find in sort plan."
        return res.status(400).json(errors)
      }
      // Loop through each match in database from provided zipcode entry
      for(i = 0; i < zip.length; i++) {
        if(arrayMatch(matchArray, zip[i].serviceLevel)) {
          // Get correct belt and outbound destination for zipcode
          Belt.findOne({ "destinations.slic": zip[i].destinationId })
          .then(belt => {
            if(belt) {
              const correctBelt = belt.belt
              for(b = 0; b < belt.destinations.length; b++) {
                // If entered zipcode matches destination - return correct belt & destination
                if(zip[i].destinationId === belt.destinations[b].slic) {
                  res.json({
                    belt: correctBelt,
                    destination: belt.destinations[b]
                  })
                }
              }
            } else {
              errors.sort = "Unable to find destination for package."
              return res.status(400).json(errors)
            }
          })
          .catch(err => console.log(err))
          break
        }
      }
    })
    .catch(err => console.log(err))
}