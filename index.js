const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
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
app.use(bodyParser.json()); /* so express can parse body of post requests */

/* *** Routes *** */
// the require statement returns a function
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

/* *** Config for Production *** */

if (process.env.NODE_ENV === 'production') {
  // Express needs to serve production assets
  // i.e build/static/js/main.js or main.css etc.
  app.use(express.static('client/build'));

  // If it's a route express doesn't know, it has
  // to assume react router will handle this
  // and should respond with index.html
  // (this has to be below other routes)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/* *** Start the Server *** */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Listening on port 4000');
});
