const users = require('express').Router()

// Get Routes
const getUsers = require('./get-users')
const register =  require('./register')
const login =  require('./login')

// Use Routes
users.get('/', getUsers)
users.post('/register', register)
users.post('/login', login)

module.exports = users