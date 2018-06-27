// Import packages
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load User Model
const User = require('../../models/User')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route  POST api/users/
// @desc   Test Users API
// @access Public
router.get('/', passport.authenticate('jwt', keys.jwtSession), (req, res) => {
  res.json({ 
    id: req.user.id,
    name: req.user.name
  })
})

// @route  POST api/users/register
// @desc   Register a new user
// @access Public
router.post('/register', (req, res) => {
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
          name: req.body.name,
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
})

// @route  POST api/users/login
// @desc   Login user
// @access Public
router.post('/login', (req, res) => {
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
              name: user.name,
              email, 
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

})

module.exports = router