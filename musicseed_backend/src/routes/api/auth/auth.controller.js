const passport = require("passport");
const { User, validate } = require("../../../models/user");
const { generate } = require("../../../lib/token");

exports.register = async (req, res) => {
  // Duplication Check
  let user = await User.findOneByEmail(req.body.email);
  if (user) {
    req.flash("joinError", "이미 가입된 이메일입니다.");
    return res.status(409).json({
      message: "email exists"
    });
    // return res.redirect('/register');
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

exports.login = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.status(404).json(info.message);
    }
    return req.login(user, async loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      const token = await generate({
        _id: user._id,
        email: user.email,
        admin: user.admin
      });

      return res.json({
        message: "logged in successfully",
        user,
        token
      });
    });
  })(req, res, next);
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

exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", (authError, user, info) => {
    const { accessToken } = info;
    console.log(info);

    // 쿠키에 토큰 박기
    req.cookies.token = accessToken;
    console.log("Cookies: ", req.cookies);

    res.redirect("/");
  })(req, res, next);
};
