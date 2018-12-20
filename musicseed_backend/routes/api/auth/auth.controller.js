/*
    /api/auth
*/
exports.register = (req, res) => {
  res.send("this router is working");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.googleCallback = (req, res) => {
  res.redirect("/");
};