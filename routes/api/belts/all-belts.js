const Belt = require('../../../models/Belt')

// @route  GET api/belts/
// @desc   View belts
// @access Public
module.exports = (req, res) => {
  Belt.find().then(belt => res.json(belt))
}