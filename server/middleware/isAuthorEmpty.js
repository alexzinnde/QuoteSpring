const isAuthorEmpty = (req, res, next) => {
  if (req.body.author === '') {
    req.body.author = undefined;
  }
  next();
};

module.exports = isAuthorEmpty;
