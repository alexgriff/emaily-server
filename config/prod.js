// this IS committed (for Heroku to see)
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: 'https://api-emaily.herokuapp.com/auth/google/callback',
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
