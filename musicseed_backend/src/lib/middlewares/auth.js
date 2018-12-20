const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
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
  try {
    token = await jwt.verify(token, req.app.get("jwt-secret"));
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message
    });
  }

  req.decoded = token;
  next();
};

module.exports = authMiddleware;