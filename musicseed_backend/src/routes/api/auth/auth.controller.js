const passport = require('passport');
const { User, validate } = require("../../../models/user");
const { generate } = require('../../../lib/token');

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

      //  패스포트 모듈로 인증 시도
      passport.authenticate("local", function(err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user)
          return res.json(404, {
            message: "Something went wrong, please try again."
          });

        // 인증된 유저 정보로 응답
        res.json(req.user);
      })(req, res, next);

      // create a promise that generates jwt asynchronously
      token = await generate({
        _id: user._id,
        email: user.email,
        admin: user.admin
      });

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
