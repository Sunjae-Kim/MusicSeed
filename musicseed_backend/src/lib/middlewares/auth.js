const { decode } = require('../token');

exports.authMiddleware = async (req, res, next) => {
  // read the token from header or url
  let token = req.headers["x-access-token"] || req.query.token;

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "not logged in"
    });
  }

  // decodes the token
  token = await decode(token);

  req.decoded = token;
  next();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}