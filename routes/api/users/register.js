const bcrypt = require('bcryptjs')
const User = require('../../../models/User')
const validateRegisterInput = require('../../../validation/register')

// @route  POST api/users/register
// @desc   Register a new user
// @access Public
module.exports = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists' 
        res.status(400).json(errors)
      } else {
        // User information
        const newUser = new User({
          username: req.body.username,
          employeeId: req.body.employeeId,
          email: req.body.email,
          password: req.body.password,
        })
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              res.status(400).json({ errors: err })
            } else {
              newUser.password = hash
              newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
            }
          })
        })
      }
    })
}