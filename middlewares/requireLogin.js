module.exports = (req, res, next) => {
  if (!req.user) {
    res.send({ status: 401, error: 'Must be Logged in' });
  }

  next();
};
