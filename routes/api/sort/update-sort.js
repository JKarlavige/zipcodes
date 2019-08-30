const Sort = require('../../../models/Sort')
const validateAddSortInput = require('../../../validation/add-sort')

// @route  POST api/sort/add-sort
// @desc   Add zipcode to sort or edit existing sort
// @access Private
module.exports = (req, res) => {
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
      if(Object.keys(sort).length > 0) {
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
}