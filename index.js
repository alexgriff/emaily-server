const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

/* *** Connection to Database *** */
mongoose.connect(keys.mongoURI);

/* *** Instance of Express Server *** */
const app = express();

/* *** Middlewares *** */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000 /* 30 days */,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* *** Routes *** */
// the require statement returns a function
require('./routes/authRoutes')(app);

/* *** Start the Server *** */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Listening on port 4000');
});
