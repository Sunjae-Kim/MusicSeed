const passport = require("passport");
const router = require("express").Router();
const controller = require("./auth.controller");
const authMiddleware = require('../../../lib/middlewares/auth');

router.post("/register", controller.register);
router.post('/login', controller.login);

router.use('/check', authMiddleware);
router.get('/check', controller.check);


router.get("/logout", controller.logout);
router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}));
router.get("/google/callback", passport.authenticate("google"), controller.googleCallback);

module.exports = router;