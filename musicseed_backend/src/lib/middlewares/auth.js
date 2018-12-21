const { decode } = require('../token');
const { getCookie } = require('../getCookie');

exports.authMiddleware = async (req, res, next) => {
  // read the token from header or url
  let token = getCookie('x-access-token', req.headers.cookie) || req.query.token;
  const auth = JSON.parse(getCookie('auth', req.headers.cookie));

  // token does not exist
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "not logged in"
    });
  }

  if(!auth){
    // decodes the token
    token = await decode(token);
    req.decoded = token;
  } else {
    // tmp code
    req.decoded = {
      admin : true
    }
  }

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