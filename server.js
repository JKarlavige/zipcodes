// Import packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Connect to database
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log(err));

// Create app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Import routes
const routes = require('./routes/api/');
// Use routes
app.use('/api/', routes);

// Set port for Heroku, else use local 5000
const port = process.env.PORT || 5000;
// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
