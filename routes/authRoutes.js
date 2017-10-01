const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // this will see the 'code' param in the query string
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    // cookie-session pkg assigns data to req.session
    // req.session is a cookie: {passport: {id: <id>}}
    // passport.deserializeUser is called implicitly
    // and passed the id
    res.send(req.user);

    // compare to express-session pkg (not used here), where data
    // stored in the session is just a reference (an id)
    // which you have to use to look up the info in the db
    // (vs here info is in the session itself)
    // advantage of db method is you can store arbitrary
    // amounts of data, no size limit
  });

  app.get('/api/logout', (req, res) => {
    req.logout(); // comes from cookie-session pkg (i think?)
    res.send(req.user);
  });
};
