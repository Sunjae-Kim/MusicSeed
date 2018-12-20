const jwt = require("jsonwebtoken");
const { User, validate } = require("../../../models/user");

exports.register = async (req, res) => {
  // Duplication Check
  let user = await User.findOneByEmail(req.body.email);
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
  user = await User.create(req.body);

  // Response
  res.send(user);
  // res.send({redirect:'/login'});
};

exports.login = async (req, res) => {
  const secret = req.app.get("jwt-secret");
  let token = null;
  const user = await User.findOneByEmail(req.body.email);

  // check the user info & generate the jwt
  if (!user) {
    return res.status(403).json({
      message: "login failed"
    });
  } else {
    // user exists, check the password
    const { pw } = req.body;
    if (user.verify(pw)) {
      // create a promise that generates jwt asynchronously
      token = await jwt.sign(
        {
          _id: user._id,
          email: user.email,
          admin: user.admin
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
  res.json({
    success: true,
    info: req.decoded
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.googleCallback = (req, res) => {
  res.redirect("/");
};