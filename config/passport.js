// Set passport strategy to JWT
const JwtStrategy = require('passport-jwt').Strategy
// Extract payload
const ExtractJwt = require('passport-jwt').ExtractJwt

// Load User model
const User = require('../models/User')

// Load keys
const keys = require('../config/keys')

// Set passport options
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if(user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}