const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../../models/User')
const validateLoginInput = require('../../../validation/login')

// @route  POST api/users/login
// @desc   Login user
// @access Public
module.exports = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  // Data from inputs
  const email = req.body.email
  const password = req.body.password

  User.findOne({email})
    .then(user => {
      // Check if email exists
      if(!user) {
        errors.email = 'Email not found'
        res.status(404).json(errors)
      }
      // Check if password exists
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) {
            errors.password = 'Password incorrect'
            res.status(400).json(errors)
          } else {
            // Email & Password correct - Create JWT payload
            const payload = {
              id: user.id,
              username: user.username,
              email, 
              admin: user.admin
            }
            // Sign and create token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                if(err) {
                  return res.status(400).json(err)
                }
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                })
              }
            )
          }
        })
    })
}