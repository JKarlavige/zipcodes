// Import packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Connect to database
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
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

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set port for Heroku, else use local 5000
const port = process.env.PORT || 5000;
// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
