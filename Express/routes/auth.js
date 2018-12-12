const passport = require("passport");

const { User } = require("../models/user");

const express = require("express");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    failureFlash: true
  }),
  (req, res) => {
    console.log("Login");
    // res.send({redirect:'/'});
  }
);



router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback", passport.authenticate("google"), function(
  req,
  res
) {
  res.redirect("/");
});

module.exports = router;
