// Import packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// Import routes
const users = require('./routes/api/users')
const sort = require('./routes/api/sort')
const belts = require('./routes/api/belts')

// Connect to database
const db = require('./config/keys').mongoURI
mongoose.connect(db)
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log(err))

// Create app
const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Passport config
app.use(passport.initialize())
// Passport Config
require('./config/passport')(passport)

// Use routes
app.use('/api/users', users)
app.use('/api/sort', sort)
app.use('/api/belts', belts)


// Set port for Heroku, else use local 5000
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))