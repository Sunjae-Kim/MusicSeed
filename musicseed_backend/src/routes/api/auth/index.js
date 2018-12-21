const passport = require("passport");
const router = require("express").Router();
const controller = require("./auth.controller");
const { authMiddleware, isNotLoggedIn, isLoggedIn } = require('../../../lib/middlewares/auth');

router.post("/register", isNotLoggedIn, controller.register);
router.post('/login',isNotLoggedIn ,controller.login);
router.get('/check',authMiddleware ,controller.check);

router.get("/logout", controller.logout);
router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}));
router.get("/google/callback", passport.authenticate("google"), controller.googleCallback);

module.exports = router;