const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

// converts to and from cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
      // why we need proxy: true is b/c of relative path
      // of callbackURL above.  On the google api dev console our
      // callbackURL is set as https://<app>.herokuapp.com/<callback>
      // because when we make a request to heroku, it hits a proxy
      // server (load balances etc) which then redirects to actual server.
      // GoogleStrategy sees the redirect and thinks that its no longer secure
      // so changes protocol to http://<app>
      // solutions are either 1- include proxy: true
      // or 2- set two diff env variables with a full path
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
