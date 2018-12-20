const jwt = require("jsonwebtoken");
const { User, validate } = require("../../../models/user");

/*
    /api/auth
*/

exports.register = async (req, res) => {
  // Duplication Check
  let user = await User.findOneByUsername(req.body.email);
  if (user) {
    return res.status(409).json({
      message: "email exists"
    });
  }

  // Validation test
  const { error } = validate(req.body);
  if (error)
    return res.status(409).json({
      message: error.message
    });

  // Make and Save
  user = new User(req.body);
  user = await user.save();

  // Response
  res.send(user);
  // res.send({redirect:'/login'});
};

exports.login = async (req, res) => {
  const secret = req.app.get("jwt-secret");
  let token = null;
  const user = await User.findOneByUsername(req.body.email);

  // check the user info & generate the jwt

  if (!user) {
    return res.status(403).json({
      message: "login failed"
    });
  } else {
    // user exists, check the password
    if (user.verify(user.pw)) {
      // create a promise that generates jwt asynchronously
      token = await jwt.sign(
        {
          _id: user._id,
          email: user.email
        },
        secret,
        {
          expiresIn: "7d",
          issuer: "musicseed.com",
          subject: "userInfo"
        }
      );
    } else {
      return res.status(403).json({
        message: "login failed"
      });
    }
  }

  // respond the token
  res.json({
    message: "logged in successfully",
    token
  });
};

exports.check = async (req, res) => {
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
  try{
    token = await jwt.verify(token, req.app.get("jwt-secret"));
  } catch(error) {
    return res.status(403).json({
      success: false,
      message: error.message
    });
  }

  // if token is valid, it will respond with its info
  res.json({
    success: true,
    info: token
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.googleCallback = (req, res) => {
  res.redirect("/");
};
