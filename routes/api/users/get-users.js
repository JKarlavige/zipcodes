// @route  POST api/users/
// @desc   Test Users API
// @access Public
module.exports = (req, res) => {
  res.json({ 
    id: req.user.id,
    username: req.user.username
  })
}