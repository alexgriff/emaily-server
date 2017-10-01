module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    res.send({ status: 403, error: 'Not enough credits' });
  }

  next();
};
